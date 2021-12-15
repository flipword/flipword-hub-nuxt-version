function loop() {
  postMessage(1);
  delay(2000);
  postMessage(2);
  delay(2000);
  postMessage(3);
  delay(3000);
  postMessage(4);
  delay(2000);
}
function delay(millis) {
  const now = Date.now();
  while (Date.now() < now + millis) {}
}
if (typeof loop != "undefined") setInterval(loop, 1);
