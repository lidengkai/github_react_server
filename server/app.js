const koa = require('koa')
const static = require('koa-static')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const nunjucks = require('koa-nunjucks-2')
const { rootPath, requireFiles } = require('./utils')
const { DIST } = require('./config')
global.initStore = {}

try {
  require(`./${DIST}/server/app`)
} catch (e) {
  console.log(e)
  console.log('app不存在')
}

module.exports = async () => {
  const app = new koa()

  onerror(app)
  app.use(logger())

  app.use(static(rootPath(`${DIST}/src`)))

  app.use(nunjucks({
    ext: 'html',
    path: rootPath(`${DIST}/server`),
    nunjucksConfig: {
      autoescape: false
    }
  }))

  if (typeof renderString === 'function') {
    const routes = await requireFiles(rootPath('/route'))
    for (let i = 0, l = routes.length; i < l; i++) {
      try {
        app.use(routes[i].routes())
      } catch (e) {
        console.log(e)
      }
    }
    app.use(async (ctx) => {
      await ctx.render('index', {
        html: renderString('/*')
      })
    })
  }

  app.use(async (ctx) => {
    ctx.response.status = 404
  })

  return app
}
