const glob = require('glob-all');

describe('Check generated css js files', () => {
  it('should generated css js files', done => {
    const files = glob.sync([
      './prod/dist/js/index-*.js',
      './prod/dist/css/index-*.css',
    ])
    if (files.length) {
      done()
    } else {
      throw new Error('no css js files generated')
    }
  })
}) 