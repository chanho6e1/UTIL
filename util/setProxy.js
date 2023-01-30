// src/main/frontend/src/setProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://i8d210.p.ssafy.io:8081',    // 서버 URL or localhost:설정한포트번호
      changeOrigin: true,
    })
  );
};