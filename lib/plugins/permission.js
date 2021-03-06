import Store from '@/store'

export default function Install(Vue, options) {
  const property = (options && options.property) || '$permission'

  function permission(permissionId) {
    return Store.getters.checkPermission(permissionId)
  }

  Vue.prototype[property] = permission

  Vue.directive('permission', {
    inserted (el, binding, vnode, oldVnode) {
      if (!Store.getters.checkPermission(binding.value)) {
        vnode.componentInstance.$destroy()
        vnode.componentInstance.$el.parentElement.removeChild(vnode.componentInstance.$el)
      }
    }
  })
}