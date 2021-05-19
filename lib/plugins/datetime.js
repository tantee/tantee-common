import helperDatetTime from 'tantee-common/lib/helperDateTime'

export default function Install (Vue, options) {
  const property = (options && options.property) || '$datetime'

  Vue.prototype[property] = helperDatetTime
}
