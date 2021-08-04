export default (geoJsonData, filenameWithoutExtension: string) => {
  const filename = filenameWithoutExtension + '.geojson';

  const blob = new Blob([geoJsonData], { type: 'text/json' });
  const link = document.createElement('a');

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':');

  const evt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true
  });

  link.dispatchEvent(evt);
  link.remove();
};
