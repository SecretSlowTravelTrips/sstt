import { createMachine, assign } from 'xstate';
import { fileToGeoJSON, generateBuffer } from '../util';
import { wikiMachine } from './wikiMachine';
import { SharedContext, sharedInitialContext } from './shared';
import { overpassMachine } from './overpassMachine';

type FileUploadEvent = { type: 'FILE_UPLOAD'; file: File };
type UpdateRadiusEvent = { type: 'UPDATE_RADIUS'; radius: number };

type AppEvent = FileUploadEvent | UpdateRadiusEvent;

type AppContext = SharedContext;

type AppTypestate =
  | {
      value: 'idle';
      context: AppContext & { file: undefined; geojson: undefined; buffer: undefined };
    }
  | {
      value: 'processFile';
      context: AppContext & { geojson: undefined; error: undefined; buffer: undefined };
    }
  | {
      value: 'generateBuffer';
      context: AppContext & { error: undefined; buffer: undefined };
    };

const addFile = assign({
  file: (_, event) => {
    return (<FileUploadEvent>event).file;
  }
});

const updateRadius = assign({
  radius: (_, event) => {
    return (<UpdateRadiusEvent>event).radius;
  }
});

const createBuffer = (context: AppContext) =>
  new Promise((resolve) => {
    return resolve(generateBuffer(context.geojson, context.radius));
  });

export const appMachine = createMachine<AppContext, AppEvent, AppTypestate>(
  {
    id: 'app',
    context: {
      ...sharedInitialContext
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          FILE_UPLOAD: {
            target: 'processFile',
            actions: ['addFile', 'clearError', 'clearGeoJSON']
          }
        }
      },
      radius: {
        entry: 'updateRadius',
        always: {}
      },
      processFile: {
        tags: ['loading'],
        invoke: {
          id: 'file-processing',
          src: (context) => fileToGeoJSON(context.file),
          onDone: {
            target: 'generateBuffer',
            actions: assign({ geojson: (_, event) => event.data })
          },
          onError: {
            target: 'idle',
            actions: [assign({ error: (_, event) => event.data }), 'clearFile']
          }
        }
      },
      generateBuffer: {
        tags: ['loading'],
        invoke: {
          id: 'buffer',
          src: createBuffer,
          onDone: {
            target: 'query',
            actions: assign({ buffer: (_, event) => event.data })
          },
          onError: {
            target: 'idle',
            actions: [assign({ error: (_, event) => event.data }), 'clearFile', 'clearGeoJSON']
          }
        }
      },
      query: {
        invoke: [
          {
            id: 'wikiMachine',
            src: wikiMachine,
            data: (context) => ({
              ...context
            })
          },
          {
            id: 'overpassMachine',
            src: overpassMachine,
            data: (context) => ({
              ...context
            })
          }
        ],
        on: {
          UPDATE_RADIUS: { target: 'generateBuffer', actions: 'updateRadius' },
          FILE_UPLOAD: {
            target: 'processFile',
            actions: ['addFile', 'clearError', 'clearGeoJSON', 'clearBuffer']
          }
        }
      }
    }
  },
  {
    actions: {
      addFile,
      clearError: assign<AppContext, AppEvent>({ error: undefined }),
      clearGeoJSON: assign<AppContext, AppEvent>({ geojson: undefined }),
      clearFile: assign<AppContext, AppEvent>({ file: undefined }),
      clearBuffer: assign<AppContext, AppEvent>({ buffer: undefined }),
      updateRadius
    }
  }
);
