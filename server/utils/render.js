module.exports = (ctx, pathname, key, state = {}) => {
  if (key) {
    return ctx.render('index', {
      initStore: `initStore.${key} = ${JSON.stringify(state)};`,
      html: renderString(pathname, { [key]: state })
    })
  }
  return ctx.render('index', {
    html: renderString(pathname)
  })
}
