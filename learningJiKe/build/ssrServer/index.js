if (typeof window === 'undefined') {
  global.window = {}
}

const fs = require('fs');
const utils = require('../utils.js')
const express =  require('express')
const { renderToString } = require('react-dom/server')
const SSR = require(utils.resolve(['prod', 'ssrdist', 'search-server.js']))
const template = fs.readFileSync(utils.resolve(['prod', 'ssrdist', 'search.html']), 'utf-8');
const data = require('./data.json')

const server = port => {
  const app = express()
  app.use(express.static('prod/ssrdist'))
  app.get('/search', (req, res) => {
    const html = renderMarkup(renderToString(SSR))
    res.status(200).send(html)
  })
  app.listen(port, () => {
    console.log('Server is running on port:' + port);
  })
}

server(process.env.PORT || 3000)

const renderMarkup = str => {
  const dataStr = JSON.stringify(data)
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window._initial_data=${dataStr}</script>`)
}
