const WebSocket = require("ws");
const port = process.argv[2];

const dim = 100000000;
const data = new Uint8Array(dim).fill(1);

// Create a WebSocket server
const wss = new WebSocket.Server({ port });

// Event handler for new WebSocket connections
wss.on("connection", ws => {
  // Event handler for incoming messages
  ws.on("message", msg => {
    console.time("download");
    console.log(`Received message, send data: ${data.length} bytes`);

    ws.send(data);

    console.timeEnd("download");
  });

  // Event handler for WebSocket connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

console.log("WebSocket server is listening on port " + port);
