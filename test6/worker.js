const ws = new WebSocket(`ws://localhost:8080`);
ws.onopen = () => {
  console.log("Connected to ws");
};

onmessage = async e => {
  console.log("Sending request: ", e.data.image);
  console.time("download:" + e.data.image);

  // connect to websocket and send a message
  ws.send(e.data.image);

  ws.onmessage = msg => {
    console.timeEnd("download:" + e.data.image);

    postMessage(msg.data);
  };
};
