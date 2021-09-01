import SPARQLQueryDispatcher from './SPARQLQueryDispatcher';
import buildQuery from './buildQuery';
import toGeoJSON from './toGeoJSON';
import {
  bbox,
  FeatureCollection,
  MultiPolygon,
  Point,
  Polygon,
  Properties,
  within
} from '@turf/turf';

export default async (
  file: File,
  buffer: FeatureCollection<Polygon | MultiPolygon>,
  langs: string[]
): Promise<FeatureCollection<Point, Properties>> => {
  const queryDispatcher = new SPARQLQueryDispatcher();

  const bbx = bbox(buffer);

  const data = within(
    toGeoJSON(await queryDispatcher.query(buildQuery([bbx[0], bbx[1]], [bbx[2], bbx[3]], langs))),
    buffer
  );
  return data;
};
