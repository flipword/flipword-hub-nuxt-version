let blobScriptUrl = null;

if (process.client) {
  const workerCode = () => {
    const loop = () => {
      // Init
      const msg1 = () => {
        postMessage(1);
        setTimeout(msg2, 2000);
      };
      // Display cursor
      const msg2 = () => {
        postMessage(2);
        setTimeout(msg3, 1000);
      };
      // Start selection
      const msg3 = () => {
        postMessage(3);
        setTimeout(msg4, 2000);
      };
      // End selection
      const msg4 = () => {
        postMessage(4);
        setTimeout(msg5, 500);
      };
      // Logo appear
      const msg5 = () => {
        postMessage(5);
        setTimeout(msg6, 1000);
      };
      // Popup appear
      const msg6 = () => {
        postMessage(6);
        setTimeout(msg1, 3000);
      };
      msg1();
    };

    if (typeof loop != "undefined") loop();
  };

  let code = workerCode.toString();
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));
  const blobScript = new Blob([code], { type: "application/javascript" });
  blobScriptUrl = URL.createObjectURL(blobScript);
}
export default blobScriptUrl;
