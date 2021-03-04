import Vue from 'vue'
import { VConfirmDialog as Confirm } from 'tantee-common'

Vue.mixin({
  beforeCreate() {
    const options = this.$options
    if (options.confirm) this.$confirm = options.confirm;
    else if (options.parent && options.parent.$confirm) this.$confirm = options.parent.$confirm
  }
});

export default function (message,options) {
  let defaultOptions = {
    title: 'Confirm',
    icon: 'info',
    color: 'primary',
  }

  return new Promise(resolve => {
    const component = new Vue(Object.assign(Confirm, {
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