exports.getApiUrl = function (urlPath) {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080" + urlPath;
  } else {
    return urlPath;
  }
};
