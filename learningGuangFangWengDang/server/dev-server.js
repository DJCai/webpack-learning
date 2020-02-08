const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('../build/webpack.dev.js');
const options = {
  contentBase: '../prod/dist',
  host: '127.0.0.1',
  port: 5000,
  hot: true,
  open: true
};

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});