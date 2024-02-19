onmessage = async e => {
  console.time("download:" + e.data.image);

  // connect to websocket and send a message
  const ws = new WebSocket(`${e.data.url}:${e.data.port}`);
  ws.onopen = () => {
    console.log("Connected to ws, sending request: ", e.data.image);
    ws.send(e.data.image);
  };

  ws.onmessage = msg => {
    console.timeEnd("download:" + e.data.image);
    ws.close();

    postMessage(msg.data);
  };
};
