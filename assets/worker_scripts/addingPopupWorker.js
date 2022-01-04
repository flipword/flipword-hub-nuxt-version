let blobScriptUrl = null;

if (process.client) {
  const workerCode = () => {
    const loop = () => {
      // Display native word
      const msg1 = () => {
        postMessage(1);
        setTimeout(msg2, 2000);
      };
      // Loading trad
      const msg2 = () => {
        postMessage(2);
        setTimeout(msg3, 2000);
      };
      // Display foreign word
      const msg3 = () => {
        postMessage(3);
        setTimeout(msg4, 1000);
      };
      // Save
      const msg4 = () => {
        postMessage(4);
        setTimeout(msg5, 500);
      };
      // Display Notify
      const msg5 = () => {
        postMessage(5);
        setTimeout(msg6, 3000);
      };
      // Reload
      const msg6 = () => {
        postMessage(6);
        setTimeout(msg1, 2000);
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
