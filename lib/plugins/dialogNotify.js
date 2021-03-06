import { VNotifyDialog as Notify } from 'tantee-common'

export default function Install(Vue, options) {
  const property = (options && options.property) || '$notify'

  function notify (message,options) {
    let defaultOptions = {
      title: 'Information',
      icon: 'info',
      color: 'primary',
    }

    return new Promise(resolve => {
      const component = new Vue(Object.assign(Notify, {
        destroyed: () => {
          document.getElementById('app').removeChild(component.$el)
          resolve(component.value)
        }
      }))
      Object.assign(component,defaultOptions, options,{message: message})
      component.$vuetify = this.$vuetify
      component.$mount()
      document.getElementById('app').appendChild(component.$el)
    })
  }
  
  Vue.prototype[property] = notify
}
