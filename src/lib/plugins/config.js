import Vue from 'vue'
import Store from '@/store'
import {isNil} from 'lodash'

function Install(Vue, options) {
  const property = (options && options.property) || '$config'

  function config(configId) {
    return (!isNil(Store.getters.getConfig(configId))) ? Store.getters.getConfig(configId) : {} 
  }

  Vue.prototype[property] = config
}

Vue.use(Install, {})
