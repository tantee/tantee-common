import { VLoadingDialog as Loading } from 'tantee-common'

export default function Install(Vue, options) {
  const property = (options && options.property) || '$loading'

  function loading (message = 'Loading', task = undefined, options) {
    const component = new Vue(Object.assign(Loading, {
      destroyed: () => {
        document.getElementById('app').removeChild(component.$el)
      }
    }))
    Object.assign(component, options,{message: message, task: task})
    component.$vuetify = this.$vuetify
    component.$mount()
    document.getElementById('app').appendChild(component.$el)
    return component
  }
  
  Vue.prototype[property] = loading
}