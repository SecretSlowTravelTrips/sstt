import { FeatureCollection, Polygon, MultiPolygon, simplify } from '@turf/turf';
import osmtogeojson from 'osmtogeojson';
import { exportToGeoJSONFile } from '$lib/util';
import fetchOverpass from '$lib/util/overpass/fetchOverpass';

export default async (
  buffer: FeatureCollection<Polygon | MultiPolygon>,
  overpassQuery: Array<Record<string, string>>,
  filename: string
): Promise<void> => {
  const simplifiedPolygon = simplify(buffer, {
    highQuality: true,
    mutate: false,
    tolerance: 0.05
  });

  let polygonstring = '';
  simplifiedPolygon.features.forEach((feat) =>
    feat.geometry.coordinates[0].forEach((coords) => {
      polygonstring += coords[1] + ' ' + coords[0] + ' ';
    })
  );
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

  const customGeoJSON = osmtogeojson(data);

  exportToGeoJSONFile(<FeatureCollection>customGeoJSON, filename);
};
