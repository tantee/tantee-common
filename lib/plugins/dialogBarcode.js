import { VBarcodeDialog as Barcode } from 'tantee-common'

export default function Install(Vue, options) {
  const property = (options && options.property) || '$barcode'

  function barcode (options) {
    return new Promise(resolve => {
      const component = new Vue(Object.assign(Barcode, {
        destroyed: () => {
          document.getElementById('app').removeChild(component.$el)
          resolve(component.value)
        }
      }))
      Object.assign(component, options)
      component.$vuetify = this.$vuetify
      component.$mount()
      document.getElementById('app').appendChild(component.$el)
    })
  }
  
  Vue.prototype[property] = barcode
}