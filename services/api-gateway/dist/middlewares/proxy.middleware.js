"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxy = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const proxy = (target) => (0, http_proxy_middleware_1.createProxyMiddleware)({
    target,
    changeOrigin: true,
    pathRewrite: { "^/api": "" }
});
exports.proxy = proxy;
