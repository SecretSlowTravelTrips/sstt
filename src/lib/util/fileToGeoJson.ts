import { gpx } from '@tmcw/togeojson';
import type { AllGeoJSON } from '@turf/turf';

export default async (file): Promise<AllGeoJSON> => {
  return await new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop();
    let geojson: AllGeoJSON;

    if (file && (fileExtension === 'geojson' || fileExtension === 'gpx')) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        let contentText = reader.result;
        if (typeof contentText === 'string') {
          if (fileExtension === 'geojson') {
            geojson = JSON.parse(contentText);
          } else if (fileExtension === 'gpx') {
            let contentXml = new DOMParser().parseFromString(contentText, 'text/xml');
            geojson = gpx(contentXml);
          }
        }
        resolve(geojson);
      });
      reader.readAsText(file);
    }
  });
};
