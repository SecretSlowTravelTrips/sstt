import { gpx } from '@tmcw/togeojson';

export default async (file) => {
  return await new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop();
    let geojson;

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
