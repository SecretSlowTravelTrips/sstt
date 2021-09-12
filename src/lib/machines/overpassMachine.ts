import { removeFilenameExtention } from '$lib/util';
import { queryAndDownload } from '$lib/util/overpass';
import { assign, createMachine } from 'xstate';
import type { SharedContext } from './shared';

type DownloadEvent = { type: 'DOWNLOAD_DATA'; query: Record<string, string>[]; name: string };
type OverpassEvent = DownloadEvent;

type OverpassContext = SharedContext & {
  query: Record<string, string>[];
  name: string;
};

const addQuery = assign({
  query: (_, event) => (<DownloadEvent>event).query
});

const addName = assign({
  name: (_, event) => (<DownloadEvent>event).name
});

const download = (context: OverpassContext) =>
  new Promise((resolve) => {
    return resolve(
      queryAndDownload(
        context.buffer,
        context.query,
        `${removeFilenameExtention(context.file.name)}---${context.radius * 1000}m---${
          context.name
        }`
      )
    );
  });

export const overpassMachine = createMachine<OverpassContext, OverpassEvent>(
  {
    id: 'overpass',
    initial: 'idle',
    states: {
      idle: {
        on: {
          DOWNLOAD_DATA: {
            target: 'download',
            actions: ['addQuery', 'addName']
          }
        }
      },
      download: {
        tags: ['loading'],
        invoke: {
          id: 'download-overpass',
          src: download,
          onDone: {
            target: 'idle'
          },
          onError: {
            target: 'idle',
            actions: assign({ error: (_, event) => event.data })
          }
        }
      }
    }
  },
  {
    actions: {
      addQuery,
      addName
    }
  }
);
