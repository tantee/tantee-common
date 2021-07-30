import Store from '@/store'
import Router from '@/router'

export default function Install(Vue, options) {
  const property = (options && options.property) || '$permission'

  function permission(permissionId) {
    return Store.getters.checkPermission(permissionId)
  }

  function permissionRoute(permissionId) {
    if (!Store.getters.checkPermission(permissionId)) Router.push('/')
  }

  Vue.prototype[property] = permission
  Vue.prototype[property+'Route'] = permissionRoute

  Vue.directive('permission', {
    inserted (el, binding, vnode, oldVnode) {
      if (!Store.getters.checkPermission(binding.value)) {
        vnode.componentInstance.$destroy()
        vnode.componentInstance.$el.parentElement.removeChild(vnode.componentInstance.$el)
      }
    }
  })
}