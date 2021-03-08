import confirm from './dialogConfirm'
import notify from './dialogNotify'
import loading from './dialogLoading'
import userCheck from './dialogUserCheck'
import barcode from './dialogBarcode'

export default function Install(Vue, options) {
  Vue.use(confirm)
  Vue.use(notify)
  Vue.use(loading)
  Vue.use(userCheck)
  Vue.use(barcode)
}