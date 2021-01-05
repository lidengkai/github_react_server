const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const portfinder = require('portfinder')
const { ENV_PRODUCTION, ENV_DEVELOPMENT, ASSETS_ROOT, STATIC_ROOT } = require('./config')
const { prodConfig, devConfig } = require('./config')

module.exports.rootPath = (dir = '') => {
  return path.join(__dirname, '..', dir)
}

module.exports.assetsPath = (dir = '') => {
  return path.join(ASSETS_ROOT, dir)
}

module.exports.staticPath = (dir = '') => {
  return path.join(STATIC_ROOT, dir)
}

module.exports.config = (mode) => {
  console.log('当前环境:', mode)
  const config = mode === ENV_PRODUCTION ? prodConfig :
    mode === ENV_DEVELOPMENT ? devConfig : {}
  return config
}

module.exports.port = (config) => {
  return new Promise((resolve, reject) => {
    portfinder.basePort = Math.max((config.devServer.port | 0) || 8080, 5000)
    portfinder.getPort((err, port) => {
      if (err) {
        return reject(err)
      }
      config.devServer.port = port
      resolve(config)
    })
  })
}

module.exports.resolve = (handle) => {
  return new Promise((resolve, reject) => {
    handle.then(config => {
      resolve(config)
    }).catch(err => {
      reject(err)
    })
  })
}

module.exports.loaders = (options = {}) => {
  const { useEslint, ssr } = options
  return [
    {
      test: /\.(jsx?|tsx?)$/,
      loader: [
        'babel-loader',
        ...(useEslint ? ['eslint-loader'] : [])
      ],
      include: /src/,
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        ...(ssr ? [] : [MiniCssExtractPlugin.loader]),
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            },
            onlyLocals: ssr
          }
        },
        'postcss-loader'
      ]
    }, {
      test: /\.less$/,
      use: [
        ...(ssr ? [] : [MiniCssExtractPlugin.loader]),
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            },
            onlyLocals: ssr
          }
        },
        'postcss-loader',
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      ]
    }
  ]
}