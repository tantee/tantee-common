import { VUserCheckDialog as UserCheck } from 'tantee-common'

export default function Install(Vue, options) {
  const property = (options && options.property) || '$userCheck'

  function userCheck (mustLogin=false,verifyCurrentUser=false,options) {
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
  
  Vue.prototype[property] = userCheck
}
