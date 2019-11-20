const dataURItoBlob = dataURI => {
  if (typeof dataURI !== 'string') {
    return null;
  }

  let byteString;

  const splitted = dataURI.split(',');
  if (splitted.length < 2) {
    return null;
  }

  if (splitted[0].indexOf('base64') >= 0) {
    byteString = atob(splitted[1]);
  } else {
    byteString = unescape(splitted[1]);
  }

  let mimeString = '';

  try {
    mimeString = splitted[0].split(':')[1].split(';')[0];
  } catch (e) {
    console.log('Can not get mime type', e);
  }

  let ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export { dataURItoBlob };

export default dataURItoBlob;
