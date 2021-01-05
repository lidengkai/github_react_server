const router = require('koa-router')()
const { render } = require('../../utils')

const pathname = '/'

router.prefix(pathname)

router.get('/', async (ctx) => {
  await render(ctx, pathname, 'Home', {
    homeText: 'home'
  })
})

module.exports = router
