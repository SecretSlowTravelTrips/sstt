import exportToGeoJsonFile from '$lib/util/exportToGeoJsonFile';
import fetchOverpass from '$lib/util/fetchOverpass';
import fileToGeoJSON from '$lib/util/fileToGeoJson';
import geoJSONToPolygon from '$lib/util/geoJsonToPolygon';
import { AllGeoJSON, feature, featureCollection, geometry, point, simplify } from '@turf/turf';
import osmtogeojson from 'osmtogeojson';

export default async (file, overpassQuery: Array<any>, filename) => {
  let createdGeoJson: AllGeoJSON = await fileToGeoJSON(file);

  let polygon = geoJSONToPolygon(createdGeoJson, 2);
  console.log(polygon);

  let simplifiedPolygon = simplify(polygon, { highQuality: true, mutate: false, tolerance: 0.05 });
  console.log(simplifiedPolygon);

  let polygonstring = '';
  simplifiedPolygon.geometry.coordinates[0].map((coordinate) => {
    polygonstring += coordinate[1] + ' ' + coordinate[0] + ' ';
  });
  polygonstring = polygonstring.trimEnd();

  let middleQuery = '';

  overpassQuery.map(
    (overpassQueryObject) =>
      (middleQuery += `way["${Object.keys(overpassQueryObject)[0]}"="${
        overpassQueryObject[Object.keys(overpassQueryObject)[0]]
      }"](poly:"${polygonstring}");`)
  );
  const query = `[out:json][timeout:150];(${middleQuery});(._;>;);out meta;`;

  const data = await fetchOverpass(query);
  console.log(data);

  let customGeoJSON = osmtogeojson(data);
  console.log(customGeoJSON);

  exportToGeoJsonFile(customGeoJSON, filename);
  return;
};
