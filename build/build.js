const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const [srcConfig, serverConfig] = require('./webpack.config')
const utils = require('./utils')
const mode = require('./config').ENV_PRODUCTION

const config = utils.config(mode)
const useBundleAnalyzer = process.env.npm_config_report

const baseConfig = {
  mode,
  // devtool: 'source-map',
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
      path: utils.rootPath('server/dist/src'),
      filename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    module: {
      rules: utils.loaders()
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: utils.assetsPath('css/[name].[chunkhash].css')
      }),
      new CleanWebpackPlugin(['dist'], {
        root: utils.rootPath('/server'),
        dry: false
      }),
      new OptimizeCssAssetsPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      ...(useBundleAnalyzer ? [
        new BundleAnalyzer.BundleAnalyzerPlugin()
      ] : []),
      ...(config.gzip ? [
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8
        })
      ] : [])
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  }),
  merge(serverConfig, baseConfig, {
    output: {
      path: utils.rootPath('server/dist/server')
    },
    module: {
      rules: utils.loaders({ ssr: true })
    }
  })
]