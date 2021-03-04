import Vue from 'vue'
import { VNotifyDialog as Notify } from 'tantee-common'

Vue.mixin({
  beforeCreate() {
    const options = this.$options
    if (options.notify) this.$notify = options.notify;
    else if (options.parent && options.parent.$notify) this.$notify = options.parent.$notify
  }
});

export default function (message,options) {
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


