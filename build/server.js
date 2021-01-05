const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const [srcConfig, serverConfig] = require('./webpack.config')
const utils = require('./utils')
const mode = require('./config').ENV_DEVELOPMENT

const config = utils.config(mode)

const baseConfig = {
  mode,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(mode)
      }
    })
  ]
}

module.exports = [
  merge(srcConfig, baseConfig, {
    output: {
      path: utils.rootPath('server/dev/src'),
      filename: utils.assetsPath('js/[name].js')
    },
    module: {
      rules: utils.loaders({ useEslint: config.useEslint })
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].css')
      }),
      new CleanWebpackPlugin(['dev'], {
        root: utils.rootPath('/server'),
        dry: false
      })
    ]
  }),
  merge(serverConfig, baseConfig, {
    module: {
      rules: utils.loaders({ ssr: true })
    },
    output: {
      path: utils.rootPath('server/dev/server')
    }
  })
]