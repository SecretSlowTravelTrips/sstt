import exportToGeoJsonFile from '$lib/util/exportToGeoJsonFile';
import fetchOverpass from '$lib/util/fetchOverpass';
import fileToGeoJSON from '$lib/util/fileToGeoJson';
import geoJSONToPolygon from '$lib/util/geoJsonToPolygon';
import { AllGeoJSON, feature, featureCollection, geometry, point, simplify } from '@turf/turf';
import osmtogeojson from 'osmtogeojson';

export default async (file, overpassQuery, filename) => {


  let createdGeoJson: AllGeoJSON = await fileToGeoJSON(file);
  let polygon = geoJSONToPolygon(createdGeoJson, 10);
  console.log(polygon);
  let simplifiedPolygon = simplify(polygon, { highQuality: true, mutate: false, tolerance: 0.05 });
  console.log(simplifiedPolygon);
  let polygonstring = '';
  simplifiedPolygon.geometry.coordinates[0].map((coordinate) => {
    polygonstring += coordinate[1] + ' ' + coordinate[0] + ' ';
  });

  const query = `[out:json][timeout:150];way["shop"="bicycle"](poly:"${polygonstring.trimEnd()}");(._;>;);out meta;`;

  const result = await fetchOverpass(query);

  console.log(data);

  let customGeoJSON = osmtogeojson(data);
  console.log(customGeoJSON);

  await exportToGeoJsonFile(customGeoJSON, filename);
  return;
};
