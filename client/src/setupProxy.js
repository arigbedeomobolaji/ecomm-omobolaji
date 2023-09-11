const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://ecomm-omobolaji-backend.vercel.app",
			changeOrigin: true,
		})
	);
};
