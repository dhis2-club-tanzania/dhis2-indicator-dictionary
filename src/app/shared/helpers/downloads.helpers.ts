export function downloadToJSON(objectData: any) {
  let filename = 'export.json';
  let contentType = 'application/json;charset=utf-8;';
  // if (window.navigator && window.navigator) {
  //   var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
  //   navigator.msSaveOrOpenBlob(blob, filename);
  // } else {
  var a = document.createElement('a');
  a.download = filename;
  a.href =
    'data:' +
    contentType +
    ',' +
    encodeURIComponent(JSON.stringify(objectData));
  a.target = '_blank';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // }
}
