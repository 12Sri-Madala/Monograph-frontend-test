// I followed the guide on https://create-react-app.dev/docs/proxying-api-requests-in-development/ to build this file

const proxy = require('http-proxy-middleware');

/**
* This file sets up a proxy which intercepts all api requests from the app and redirects them to the giphy api 
* while changing the origin to bypass CORS restriction. 
*/
module.exports = function (app) {
	app.use(
		'/api/giphySearch',
		proxy({
			target: 'https://api.giphy.com',
			pathRewrite: function (path, req) {
				return `/v1/gifs/search?api_key=sYqmI43tpnW0Tw5VMYxB5WDEj9ZEhDCF&q=${req.query.q}&limit=2&offset=${req.query.offset}&rating=R&lang=en`
			},
			changeOrigin: true
		})
	)
}
