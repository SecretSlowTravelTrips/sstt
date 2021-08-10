import { AllGeoJSON, simplify } from '@turf/turf';
import osmtogeojson from 'osmtogeojson';
import { exportToGeoJsonFile, fileToGeoJSON, geoJsonToPolygon } from '$lib/util';
import fetchOverpass from '$lib/util/overpass/fetchOverpass';

export default async (file, overpassQuery: Array<any>, filename, radius = 1) => {
  let createdGeoJson: AllGeoJSON = await fileToGeoJSON(file);

  let polygon = geoJsonToPolygon(createdGeoJson, radius);
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
      (middleQuery += `nwr["${Object.keys(overpassQueryObject)[0]}"="${
        overpassQueryObject[Object.keys(overpassQueryObject)[0]]
      }"](poly:"${polygonstring}");`)
  );

  const query = `[out:json][timeout:150];(${middleQuery});(._;>;);out center;`;

  const data = await fetchOverpass(query);
  console.log(data);

  let customGeoJSON = osmtogeojson(data);
  console.log(customGeoJSON);

  exportToGeoJsonFile(customGeoJSON, filename);
  return;
};
