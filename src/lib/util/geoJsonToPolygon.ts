import { buffer, Feature, Polygon } from '@turf/turf';

export default (geoJSON, radius: number)  => {
  let feature: Feature;
  if (geoJSON.type === 'FeatureCollection') {
    feature = geoJSON.features[0];
  } else if (geoJSON.type === 'Feature') {
    feature = geoJSON;
  } else {
    throw new Error('No Feature found in GeoJson');
  }

  return buffer(feature, radius, { units: 'kilometers' });
};
