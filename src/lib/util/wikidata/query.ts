import exportToGeoJsonFile from '$lib/util/exportToGeoJsonFile';
import fileToGeoJSON from '$lib/util/fileToGeoJson';
import SPARQLQueryDispatcher from './SPARQLQueryDispatcher';
import buildQuery from './buildQuery';
import toGeoJSON from './toGeoJSON';
import geoJSONToPolygon from '$lib/util/geoJsonToPolygon';
import { AllGeoJSON, bbox, Point, Properties, within } from '@turf/turf';

export default async (file): FeatureCollection<Point, Properties> => {
  const queryDispatcher = new SPARQLQueryDispatcher();
  const createdGeoJson: AllGeoJSON = await fileToGeoJSON(file);

  const polygon = geoJSONToPolygon(createdGeoJson, 1);
  const bbx = bbox(polygon);

  const data = toGeoJSON(
    await queryDispatcher.query(buildQuery([bbx[0], bbx[1]], [bbx[2], bbx[3]]))
  );

  return within(data, polygon);
};
