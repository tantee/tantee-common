import confirm from './dialogConfirm'
import notify from './dialogNotify'
import loading from './dialogLoading'
import userCheck from './dialogUserCheck'

export default function Install(Vue, options) {
  Vue.use(confirm)
  Vue.use(notify)
  Vue.use(loading)
  Vue.use(userCheck)
}