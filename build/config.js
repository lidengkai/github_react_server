module.exports.ENV_PRODUCTION = 'production'
module.exports.ENV_DEVELOPMENT = 'development'
module.exports.ENV_NONE = 'none'
module.exports.ASSETS_ROOT = 'public'
module.exports.STATIC_ROOT = 'static'

// prod
module.exports.prodConfig = {
  // 启用gzip打包
  gzip: false
}

// dev
module.exports.devConfig = {
  // 启用eslint
  useEslint: true
}