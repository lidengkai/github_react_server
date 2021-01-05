const path = require('path')
const render = require('./render')
const { getFiles } = require('./file')

module.exports.render = render

module.exports.rootPath = (pathname = '') => {
  return path.join(__dirname, '..', pathname)
}

module.exports.requireFiles = async (dir) => {
  const configs = []
  const regPath = /\.js$/
  const paths = await getFiles(dir)
  if (paths instanceof Array) {
    for (let i = 0, l = paths.length; i < l; i++) {
      try {
        const path = paths[i]
        if (regPath.test(path)) {
          const config = require(path)
          if (config) {
            configs.push(config)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  return configs
}