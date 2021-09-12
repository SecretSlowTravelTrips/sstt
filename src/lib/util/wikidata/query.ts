import SPARQLQueryDispatcher from './SPARQLQueryDispatcher';
import buildQuery from './buildQuery';
import toGeoJSON from './toGeoJSON';
import { bbox, FeatureCollection, MultiPolygon, Point, Polygon, within } from '@turf/turf';
import type Wikidata from './wikidata';

export default async (
  buffer: FeatureCollection<Polygon | MultiPolygon>,
  langs: string[]
): Promise<FeatureCollection<Point, Wikidata>> => {
  const queryDispatcher = new SPARQLQueryDispatcher();

  const bbx = bbox(buffer);

  const data = within(
    toGeoJSON(await queryDispatcher.query(buildQuery([bbx[0], bbx[1]], [bbx[2], bbx[3]], langs))),
    buffer
  );
  return data;
};
