import { aggregate, AggregatedWikidata, filter, typesAllowedByDefault } from '$lib/util/wikidata';
import { featureCollection } from '@turf/helpers';
import { createMachine, assign } from 'xstate';
import { exportToGeoJSONFile, removeFilenameExtention } from '../util';
import query from '../util/wikidata/query';
import { SharedContext, sharedInitialContext } from './shared';

type LoadDataEvent = { type: 'LOAD_DATA'; langs: string[] };
type DownloadDataEvent = { type: 'DOWNLOAD_DATA' };
type UpdateTypeEvent = { type: 'UPDATE_TYPE'; code: string };
type WikidataEvent = LoadDataEvent | DownloadDataEvent | UpdateTypeEvent;

type WikidataType = {
  code: string;
  allow: boolean;
};

type WikiContext = SharedContext & {
  data: AggregatedWikidata;
  allowlist: { [key: string]: WikidataType };
  langs: string[];
};

const addLangs = assign({
  langs: (_, event) => {
    return (<LoadDataEvent>event).langs;
  }
});

const updateType = assign({
  allowlist: (context: WikiContext, event) => {
    const allowlist = context.allowlist;
    allowlist[(<UpdateTypeEvent>event).code].allow = !allowlist[(<UpdateTypeEvent>event).code]
      .allow;
    return allowlist;
  }
});

const downloadWikidata = (context: WikiContext) =>
  new Promise((resolve) => {
    const allowedTypes = Object.keys(context.allowlist).filter(
      (code) => context.allowlist[code].allow
    );
    return resolve(
      exportToGeoJSONFile(
        featureCollection(
          Object.values(filter(context.data, allowedTypes)).reduce(
            (acc, curr) => acc.concat(curr.features),
            []
          )
        ),
        `${removeFilenameExtention(context.file.name)}---${context.radius * 1000}m---wikidata`
      )
    );
  });

const fetchWikidata = (context: WikiContext) =>
  new Promise((resolve) => {
    return resolve(query(context.buffer, context.langs));
  });

const initList = (types: string[], allow = true): { [key: string]: WikidataType } => {
  const obj = {};
  types.forEach((code) => {
    obj[code] = { code, allow };
  });
  return obj;
};

const fillAllowlist = assign({
  allowlist: (context: WikiContext) =>
    initList(Object.keys(filter(context.data, typesAllowedByDefault())))
});

const initialContext = {
  data: undefined,
  allowlist: {},
  langs: ['fr', 'nl', 'en']
};

export const wikiMachine = createMachine<WikiContext, WikidataEvent>(
  {
    id: 'wikidata',
    context: {
      ...initialContext,
      ...sharedInitialContext
    },
    initial: 'idle',
    states: {
      idle: {
        entry: ['initLangs', 'clearAllowlist'],
        on: {
          LOAD_DATA: { target: 'load', actions: 'addLangs' }
        }
      },
      load: {
        tags: ['loading'],
        invoke: {
          id: 'fetch-wikidata',
          src: fetchWikidata,
          onDone: {
            target: 'updateLists',
            actions: [assign({ data: (_, event) => aggregate(event.data) }), 'fillAllowlist']
          },
          onError: {
            target: 'idle',
            actions: assign({ error: (_, event) => event.data })
          }
        }
      },
      download: {
        tags: ['loading'],
        invoke: {
          id: 'download-wikidata',
          src: downloadWikidata,
          onDone: {
            target: 'updateLists'
          },
          onError: {
            target: 'idle',
            actions: assign({ error: (_, event) => event.data })
          }
        }
      },
      updateLists: {
        on: { DOWNLOAD_DATA: 'download', UPDATE_TYPE: { actions: 'updateType' } }
      }
    }
  },
  {
    actions: {
      addLangs,
      updateType,
      initLangs: assign({ langs: initialContext.langs }),
      clearAllowlist: assign({ allowlist: {} }),
      clearData: assign<WikiContext>({ data: undefined }),
      fillAllowlist
    }
  }
);
