const ws = new WebSocket(`ws://localhost:8080`);
ws.onopen = () => {
  console.log("Connected to ws");
};

let first = true;

onmessage = async e => {
  console.log("Sending request: ", e.data.image);
  console.time("download:" + e.data.image);

  // connect to websocket and send a message
  ws.send(e.data.image);

  ws.onmessage = msg => {
    if (first) {
      console.timeEnd("download:" + "imageA");
      first = false;
    } else {
      console.timeEnd("download:" + "imageB");
    }

    postMessage(msg.data);
  };
};
