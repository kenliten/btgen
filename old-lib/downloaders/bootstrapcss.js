const https = require('https');
const fs = require('fs');
module.exports = function bootstrapCSS(version = '4.4.1', minified = true, write = null){
  var uri = `https://stackpath.bootstrapcdn.com/bootstrap/${version}/css/bootstrap.${minified ? 'min.' : '' }css`;
  https.get(uri).on('response', function (response) {
    let body = '';
    response.on('data', function (chunk) {
        body += chunk;
    });
    response.on('end', function () {
      if (write != null){
        fs.writeFileSync(`${write}/bootstrap.${minified ? 'min.' : '' }css`, body);
      }else{
        return body;
      }
    });
    response.on('error', err => {
      console.log(err);
    });
  });
}
