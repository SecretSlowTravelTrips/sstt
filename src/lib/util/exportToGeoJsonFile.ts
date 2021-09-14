import type { AllGeoJSON } from '@turf/turf';

export default (geoJsonData: AllGeoJSON, filenameWithoutExtension: string): void => {
  const filename = filenameWithoutExtension + '.geojson';

  const dataStr = JSON.stringify(geoJsonData);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', filename);
  linkElement.click();
  linkElement.remove();
};
