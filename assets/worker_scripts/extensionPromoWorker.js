let blobScriptUrl = null;

if (process.client) {
  const workerCode = () => {
    const loop = () => {
      // Init
      postMessage(1);
      delay(2000);
      // Display cursor
      postMessage(2);
      delay(1000);
      // Start selection
      postMessage(3);
      delay(2000);
      // End selection
      postMessage(4);
      delay(500);
      // Logo appear
      postMessage(5);
      delay(1000);
      // Popup appear
      postMessage(6);
      delay(3000);
    };

    const delay = (millis) => {
      const now = Date.now();
      while (Date.now() < now + millis) {}
    };

    if (typeof loop != "undefined") setInterval(loop, 1);
  };

  let code = workerCode.toString();
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  const blobScript = new Blob([code], { type: "application/javascript" });
  blobScriptUrl = URL.createObjectURL(blobScript);
}
export default blobScriptUrl;
