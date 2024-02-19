const WebSocket = require("ws");

const image1 = "2.25.141943277300308328646128274728025006035"; // 52 mb
const image2 = "2.25.127766966279065287984140570760102964942"; // 54 mb
const baseUrl =
  "http://172.10.19.35:8042/wado?requestType=WADO&contentType=application/dicom&objectUID=";

let data = {
  fetch1: new Uint8Array(),
  fetch2: new Uint8Array()
};

downloadData = async (url, name) => {
  console.log("run");
  return new Promise(async (resolve, reject) => {
    console.time(name);
    let res = await fetch(url);
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // console.log("done");
        break;
      } else {
        let newArr = new Uint8Array(data[name].length + value.length);
        newArr.set(data[name]);
        newArr.set(value, data[name].length);
        data[name] = newArr;
      }
    }
    console.timeEnd(name);
    console.log("download done", name, data[name].length);
    resolve();
  });
};

Promise.all([
  downloadData(`${baseUrl}${image1}`, "fetch1"),
  downloadData(`${baseUrl}${image2}`, "fetch2")
]).then(() => {
  console.log("open ws");
  // console.log("data", data);
  openWs();
});

openWs = () => {
  // Create a WebSocket server
  const wss = new WebSocket.Server({ port: 8080 });

  const queue = [];

  // Event handler for new WebSocket connections
  wss.on("connection", ws => {
    // Event handler for incoming messages
    ws.on("message", msg => {
      const name = msg.toString();
      queue.push(name);
      console.time("download:" + name);
      console.log("Received message:", name);

      ws.send(data[name]);
    });

    // Event handler for WebSocket connection close
    ws.on("close", e => {
      console.log("WebSocket connection closed", e);
      console.timeEnd("download:" + queue[0]);
      queue.shift();
    });

    // ws.send("Ready");
  });

  console.log("WebSocket server is listening on port 8080");
};