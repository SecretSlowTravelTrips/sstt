import { buffer, Feature } from '@turf/turf';

export default (feature: Feature, radius: number) => {
  return buffer(feature, radius, {units: 'kilometers'});
};
