import { AllGeoJSON, FeatureCollection, simplify } from '@turf/turf';
import osmtogeojson from 'osmtogeojson';
import { fileToGeoJSON, generateBuffer, exportToGeoJSONFile } from '$lib/util';
import fetchOverpass from '$lib/util/overpass/fetchOverpass';

export default async (file: File, overpassQuery: Array<any>, filename, radius = 1) => {
  const createdGeoJson: FeatureCollection = await fileToGeoJSON(file);

  const polygon = generateBuffer(createdGeoJson, radius);
  console.log(polygon);

  const simplifiedPolygon = simplify(polygon, {
    highQuality: true,
    mutate: false,
    tolerance: 0.05
  });
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

  const customGeoJSON = osmtogeojson(data);
  console.log(customGeoJSON);

  exportToGeoJSONFile(customGeoJSON, filename);
  return;
};
