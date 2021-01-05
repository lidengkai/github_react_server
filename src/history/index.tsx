const history: {
  push(pathname: string): void
  replace(pathname: string): void
  refresh(): void
} = {
  push: (pathname) => {
    if (typeof location !== 'undefined' && pathname) {
      location.href = pathname
    }
  },
  replace: (pathname) => {
    if (typeof location !== 'undefined' && pathname) {
      location.replace(pathname)
    }
  },
  refresh: () => {
    if (typeof location !== 'undefined') {
      location.reload()
    }
  }
}

export default history
