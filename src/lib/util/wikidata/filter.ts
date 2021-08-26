import { featureCollection, FeatureCollection, Point, Properties } from '@turf/turf';
import config from './config.json';

export const typesAllowedByDefault = (): Set<string> => {
  const types = new Set<string>();
  for (const category in config.allow) {
    for (const type of config.allow[category].types) {
      types.add(type.id);
    }
  }
  return types;
};

export const filter = (
  data: FeatureCollection<Point, Properties>,
  types: Set<string>
): FeatureCollection<Point> => {
  return featureCollection(
    data.features.filter(
      ({ properties }) => properties.instance && types.has(properties.instance.split('/').pop())
    )
  );
};
