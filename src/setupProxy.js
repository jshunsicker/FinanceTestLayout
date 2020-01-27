const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/goodreads",
    proxy({
      target: "https://www.goodreads.com",
      changeOrigin: true,
      pathRewrite: {
        "/goodreads": "/"
      }
    })
  );

  app.use(
    "/gbooks",
    proxy({
      target: "https://www.googleapis.com/books",
      changeOrigin: true,
      pathRewrite: {
        "/gbooks": "/"
      }
    })
  );
};
