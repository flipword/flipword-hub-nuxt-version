const workerCode = () => {
  const loop = () => {
    // Display native word
    postMessage(1);
    delay(2000);
    // Loading trad
    postMessage(2);
    delay(2000);
    // Display foreign word
    postMessage(3);
    delay(1000);
    // Save
    postMessage(4);
    delay(500);
    // Display Notify
    postMessage(5);
    delay(3000);
    // Reload
    postMessage(6);
    delay(2000);
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
const blobScriptUrl = URL.createObjectURL(blobScript);

export default blobScriptUrl;
