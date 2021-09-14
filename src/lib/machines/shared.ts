import type { FeatureCollection, MultiPolygon, Polygon } from '@turf/turf';

export type SharedContext = {
  geojson: FeatureCollection;
  error: Error;
  radius: number;
  buffer: FeatureCollection<Polygon | MultiPolygon>;
  file: File;
};

export const sharedInitialContext = {
  geojson: undefined,
  error: undefined,
  radius: 1,
  buffer: undefined,
  file: undefined
};
