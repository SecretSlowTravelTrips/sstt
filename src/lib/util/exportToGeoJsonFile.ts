export default (geoJsonData, filenameWithoutExtension: string) => {
  const filename = filenameWithoutExtension + '.geojson';

  let dataStr = JSON.stringify(geoJsonData);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', filename);
  linkElement.setAttribute('download', filename);
  linkElement.click();
  linkElement.remove();
};
