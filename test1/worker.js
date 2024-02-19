onmessage = e => {
  console.log("Message received from main script", e);
  setTimeout(() => {
    console.log("run");
    // add a very long for loop to test the web worker
    for (var i = 0; i < 1000000000; i++) {
      if (i % 100000000 === 0) {
        //   console.log(i);
        //   create a text and add it to the dom
        const workerResult = i;
        postMessage(workerResult);
      }
    }
  }, 2000);
};
