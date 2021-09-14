import { buffer, FeatureCollection, MultiPolygon, Polygon } from '@turf/turf';

export default (
  geoJSON: FeatureCollection,
  radius: number
): FeatureCollection<Polygon | MultiPolygon> => {
  const res = buffer(geoJSON, radius, { units: 'kilometers' });
  if (!res) throw new Error('Unable to create a buffer.');
  return res;
};
