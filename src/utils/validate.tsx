export default {
  has() {
    return /^.+$/
  },
  pwd() {
    return /^\S+$/
  },
  mobile() {
    return /^1[0-9]{10}$/
  },
  string(min = 0, max: number | '' = '') {
    return new RegExp(`^.{${min},${max}}$`)
  },
  number(min = 0, max: number | '' = '') {
    return new RegExp(`^[0-9]{${min},${max}}$`)
  },
  code(min = 0, max: number | '' = '', other: string = '') {
    return new RegExp(`^[a-zA-Z0-9${other}]{${min},${max}}$`)
  }
}
