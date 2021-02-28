import Vue from 'vue'
import Loading from '@/components/dialog/vLoadingDialog.vue'

Vue.mixin({
  beforeCreate() {
    const options = this.$options
    if (options.loading) this.$loading = options.loading;
    else if (options.parent && options.parent.$loading) this.$loading = options.parent.$loading
  }
});

export default function (message = 'Loading', task = undefined, options) {
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