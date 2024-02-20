const ws1 = new WebSocket(`ws://localhost:8081`);
const ws2 = new WebSocket(`ws://localhost:8082`);
ws1.onopen = () => {
  console.log("Connected to ws1");
};
ws2.onopen = () => {
  console.log("Connected to ws2");
};

onmessage = async e => {
  console.log("Sending request: ", e.data.image);
  console.time("download:" + e.data.image);

  if (e.data.image === "imageA") {
    ws1.send(e.data.image);
    ws1.onmessage = msg => {
      console.timeEnd("download:" + e.data.image);

      postMessage(msg.data);
    };
  }
  if (e.data.image === "imageB") {
    ws2.send(e.data.image);
    ws2.onmessage = msg => {
      console.timeEnd("download:" + e.data.image);

      postMessage(msg.data);
    };
  }
};
