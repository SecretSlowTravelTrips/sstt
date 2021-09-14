import wktLiteralPointToArray from './wktLiteralPointToArray';
import { FeatureCollection, featureCollection, Point, point } from '@turf/turf';
import type Wikidata from './wikidata';

export default (simplifiedResults: Wikidata[]): FeatureCollection<Point, Wikidata> =>
  featureCollection(
    simplifiedResults.map((res) => {
      const location = wktLiteralPointToArray(res.location);
      delete res.location;
      return point(location, res);
    })
  );
