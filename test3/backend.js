const { downloadData, openWs } = require("../common.js");
const config = require("../config.js");
console.log("config", config);

let data = {
  imageA: null,
  imageB: null
};

downloadData(`${config.pacsBaseUrl}${config.imageA}`, "imageA").then(
  contentA => {
    data.imageA = contentA;
    downloadData(`${config.pacsBaseUrl}${config.imageB}`, "imageB").then(
      contentB => {
        data.imageB = contentB;
        console.log("open ws");
        openWs(data, 8080);
      }
    );
  }
);
