const router = require('koa-router')()
const { render } = require('../../utils')

const pathname = '/test'

router.prefix(pathname)

router.get('/', async (ctx) => {
  await render(ctx, pathname, 'Test', {
    testText: 'test'
  })
})

module.exports = router
