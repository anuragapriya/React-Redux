const imgToBase64=(url, callback)=> {
    if (!window.FileReader) {
      callback(null);
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result.replace('text/xml', 'image/png'));
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  export default imgToBase64;