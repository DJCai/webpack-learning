const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const utils = require('../utils.js')
const config = require('../webpack.dev.js');
console.log(utils.resolve(['prod', 'dist']))
const options = {
  contentBase: utils.resolve(['prod', 'dist']),
  host: '127.0.0.1',
  port: 5000,
  hot: true,
  open: true,
  stats: 'errors-only'
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new WebpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  console.log('dev server listening on port 5000');
});
