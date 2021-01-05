/**
 * @module formatter
 */
export default {
  trim(value: any): string {
    if (value || value === 0) {
      return String(value).trim()
    }
    return ''
  },
  numberString(value: any, decimal: number = 0): string {
    return (Number(value) || 0).toFixed(decimal)
  }
}
