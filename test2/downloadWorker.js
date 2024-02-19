onmessage = async e => {
  console.log("Message received from main script", e.data);
  console.time("download" + e.data.slice(-3));
  const res = await fetch(e.data);
  console.log("download res", res);
  const reader = res.body.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) {
      console.log("done");
      console.timeEnd("download" + e.data.slice(-3));
      const workerResult = "OK";
      postMessage(workerResult);
      break;
    }
  }
};
