const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/products",
    createProxyMiddleware({
      target: "https://la-tranca-backend.onrender.com",
      changeOrigin: true,
    })
  );

  app.use(
    "/users",
    createProxyMiddleware({
      target: "https://la-tranca-backend.onrender.com",
      changeOrigin: true,
    })
  );

  app.use(
    "/orders",
    createProxyMiddleware({
      target: "https://la-tranca-backend.onrender.com",
      changeOrigin: true,
    })
  );
};
