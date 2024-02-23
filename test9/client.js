const WebSocket = require("ws");
const address = process.argv[2];
const port = process.argv[3];

const ws = new WebSocket(`ws://${address}:${port}`);

ws.on("open", () => {
  console.log("Connected to server");
  console.time("download");

  ws.send("Gimme all the data!");
});

ws.on("message", data => {
  console.timeEnd("download");
  console.log(`Received response: ${data.length} bytes`);
});

ws.on("close", () => {
  console.log("Connection closed");
});
