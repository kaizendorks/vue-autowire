const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();

// Use webpack dev middleware to serve the site
app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/',
  stats: {
    colors: true,
    chunks: false
  }
}));

// Catch-all route to redirect to the index page
app.use((req, res) => res.redirect('/'));

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
