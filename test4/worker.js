onmessage = async e => {
  console.log("Message received from main script", e.data);
  console.time("download:" + e.data);

  // connect to websocket and send a message

  const ports = {
    fetch1: 8081,
    fetch2: 8082
  };

  // const ws = new WebSocket("ws://localhost:" + ports[e.data]);
  const ws = new WebSocket("ws://172.10.19.3:" + ports[e.data]);
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
