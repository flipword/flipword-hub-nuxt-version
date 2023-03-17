export enum BrowserType {
  Android,
  Iphone,
  Web,
}

export const getBrowserType = () => {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return BrowserType.Iphone;
  } else if (/Android/i.test(navigator.userAgent)) {
    return BrowserType.Android;
  } else {
    return BrowserType.Web;
  }
};
