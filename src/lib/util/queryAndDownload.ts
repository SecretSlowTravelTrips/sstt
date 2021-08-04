import fileToGeoJSON from '$lib/util/fileToGeoJSON';

export default async (file, overpass, filename) => {
  const exportToJsonFile = (jsonData, filename) => {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileName = filename + 'geojson';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  //   return exportToJsonFile(JSON.parse('{"test": "test"}'), 'test');
  let createdGeoJson = await fileToGeoJSON(file);
  console.log(createdGeoJson);
  return;
};
