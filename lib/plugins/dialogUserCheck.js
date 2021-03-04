import Vue from 'vue'
import { VUserCheckDialog as UserCheck } from 'tantee-common'

Vue.mixin({
  beforeCreate() {
    const options = this.$options
    if (options.userCheck) this.$userCheck = options.userCheck;
    else if (options.parent && options.parent.$userCheck) this.$userCheck = options.parent.$userCheck
  }
});

export default function (mustLogin=false,verifyCurrentUser=false,options) {
  return new Promise(resolve => {
    const component = new Vue(Object.assign(UserCheck, {
      destroyed: () => {
        document.getElementById('app').removeChild(component.$el)
        resolve(component.value)
      }
    }))
    Object.assign(component, options, { mustLogin: mustLogin, verifyCurrentUser: verifyCurrentUser })
    component.$store = this.$store
    component.$vuetify = this.$vuetify
    component.$mount()
    document.getElementById('app').appendChild(component.$el)
  })
}
