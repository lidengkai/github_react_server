export default (content: string) => {
  const e = document.createElement('textarea')
  e.style.cssText = 'position: fixed; top: 0; opacity: 0;'
  e.value = content
  document.body.append(e)
  e.select()
  let flag = false
  try {
    document.execCommand('Copy')
    flag = true
  } catch (_) {
  }
  e.remove()
  return flag
}
