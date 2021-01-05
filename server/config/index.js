const devConfig = require('./config.dev')
const testConfig = require('./config.test')
const prodConfig = require('./config.prod')
const watchConfig = require('./config.watch')

const PRODUCTION = 'production'
const TESTING = 'testing'
const DEVELOPMENT = 'development'

const ENV = process.env.NODE_ENV
console.log('env:', ENV)

const config = ENV === PRODUCTION ? prodConfig
  : ENV === TESTING ? testConfig
    : ENV === DEVELOPMENT ? devConfig
      : watchConfig

module.exports = {
  ...config,
  PRODUCTION,
  TESTING,
  DEVELOPMENT,
  ENV
}
