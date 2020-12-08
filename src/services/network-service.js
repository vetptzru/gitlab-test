const https = require("https");

class NetworkService {
  getByURL = async (url) => {
    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = "";
          res.on("data", (d) => {
            data += d;
          });
          res.on("end", () => {
            resolve(data);
          });
        })
        .on("error", (e) => {
          reject(e.message);
        });
    });
  };
}

module.exports = {
  NetworkService,
};
