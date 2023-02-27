const request = require("request");
function httprequest(option) {
  return new Promise((resolve, reject) => {
    request(option, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }
      if (error) {
        reject(error);
      }
    });
  });
}

module.exports = httprequest;
