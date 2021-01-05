import moment from 'moment'

export default {
  nextRender() {
    return new Promise<void>(resolve => {
      requestAnimationFrame(() => {
        resolve()
      })
    })
  },
  lazy(time = 0) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  },
  now(format?: string) {
    if (format) {
      return moment().format(format)
    }
    return moment()
  }
}
