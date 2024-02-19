onmessage = async e => {
  console.log("Message received from main script", e.data);
  console.time("download:" + e.data);

  // connect to websocket and send a message
  const ws = new WebSocket("ws://localhost:8080");
  ws.onopen = () => {
    console.log("Connected to ws, sending request: ", e.data);
    ws.send(e.data);
  };

  ws.onmessage = msg => {
    console.log("Received message:", msg.data.size);
    console.timeEnd("download:" + e.data);
    ws.close();

    postMessage(msg.data);
  };
};
