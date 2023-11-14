//src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

const url = 'http://localhost:3000/';

module.exports = app => {
  app.use(
    '/openapi',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    }),
  );
};
