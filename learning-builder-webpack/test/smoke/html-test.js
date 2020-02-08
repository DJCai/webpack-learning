const glob = require('glob-all');

describe('Check generated html files', () => {
  it('should generated html files', done => {
    const files = glob.sync([
      './prod/dist/index.html'
    ])
    if (files.length) {
      done()
    } else {
      throw new Error('no html files generated')
    }
  })
}) 
