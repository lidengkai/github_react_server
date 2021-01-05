/**
 * @module file
 */
const fs = require('fs')

function readPathType(path) {
  return new Promise(resolve => {
    fs.stat(path, function (err, stats) {
      if (!err) {
        if (stats.isFile()) {
          return resolve('file')
        }
        if (stats.isDirectory()) {
          return resolve('directory')
        }
      }
      resolve('')
    })
  })
}

function readDir(path) {
  return new Promise(resolve => {
    fs.readdir(path, (err, data) => {
      if (err) {
        resolve([])
      } else {
        resolve(data)
      }
    })
  })
}

async function getFiles(path, info = []) {
  const type = await readPathType(path)
  if (type === 'file') {
    info.push(path)
  } else if (type === 'directory') {
    const paths = await readDir(path)
    for (let i = 0, l = paths.length; i < l; i++) {
      await getFiles(path + '/' + paths[i], info)
    }
  }
  return info
}

module.exports.getFiles = getFiles