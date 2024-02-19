const WebSocket = require("ws");

const downloadData = async (url, name) => {
  let data = new Uint8Array(0);
  console.log("run", name);
  return new Promise(async (resolve, reject) => {
    console.time(name);
    let res = await fetch(url);
    const reader = res.body.getReader();
    let chunk_n = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // console.log("done");
        break;
      } else {
        chunk_n++;
        let newArr = new Uint8Array(data.length + value.length);
        newArr.set(data);
        newArr.set(value, data.length);
        data = newArr;
        newArr = null;
        delete newArr;
        if (chunk_n % 100 === 0) {
          console.log("downloaded", data.length / 1024 / 1024, "mb");
          global.gc();
          // console.log("memory", process.memoryUsage());
        }
      }
    }
    console.timeEnd(name);
    console.log("download done", name, data.length);
    resolve(data);
  });
};

function openWs(data, port) {
  console.log("open ws", port);

  // Create a WebSocket server
  const wss = new WebSocket.Server({ port });

  const queue = [];

  // Event handler for new WebSocket connections
  wss.on("connection", ws => {
    // Event handler for incoming messages
    ws.on("message", msg => {
      const name = msg.toString();
      queue.push(name);
      console.time("download:" + name);
      console.log("Received message, send data:", name);

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

  console.log("WebSocket server is listening on port " + port);
}

module.exports = { downloadData, openWs };
