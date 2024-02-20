const { downloadData, openWs } = require("../common.js");
const config = require("../config.js");
console.log("config", config);

const dim = 200000000;

const data = {
  imageA: new Uint8Array(dim).fill(1),
  imageB: new Uint8Array(dim).fill(2)
};

openWs(data, 8081);
openWs(data, 8082);
