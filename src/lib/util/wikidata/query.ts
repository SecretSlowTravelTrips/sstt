import fileToGeoJSON from '$lib/util/fileToGeoJson';
import SPARQLQueryDispatcher from './SPARQLQueryDispatcher';
import buildQuery from './buildQuery';
import toGeoJSON from './toGeoJSON';
import generateBuffer from '$lib/util/generateBuffer';
import { AllGeoJSON, bbox, FeatureCollection, Point, Properties, within } from '@turf/turf';

export default async (
  file,
  radius = 1,
  langs: string[]
): Promise<FeatureCollection<Point, Properties>> => {
  const queryDispatcher = new SPARQLQueryDispatcher();
  const createdGeoJson: AllGeoJSON = await fileToGeoJSON(file);

  const polygon = generateBuffer(createdGeoJson, radius);
  const bbx = bbox(polygon);

  const data = within(
    toGeoJSON(await queryDispatcher.query(buildQuery([bbx[0], bbx[1]], [bbx[2], bbx[3]], langs))),
    polygon
  );
  return data;
};
