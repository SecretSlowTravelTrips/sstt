import type { AggregatedWikidata } from './aggregate';
import config from './config.json';

export const typesAllowedByDefault = (): Record<string, string[]> => {
  const types = {};
  for (const category in config.allow) {
    for (const type of config.allow[category].types) {
      if (!types[type.id]) types[type.id] = [];
      types[type.id].push(config.allow[category].name);
    }
  }
  return types;
};

export const filter = (
  data: AggregatedWikidata,
  types: Record<string, string[]> | string[]
): AggregatedWikidata => {
  const filtered = {};
  const typeKeys = new Set(Array.isArray(types) ? types : Object.keys(types));
  Object.keys(data).forEach((code) => {
    if (!Array.isArray(types)) data[code].categories = types[code];
    if (typeKeys.has(code)) filtered[code] = data[code];
  });
  return filtered;
};
