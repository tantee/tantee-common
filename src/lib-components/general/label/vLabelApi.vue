<template>
  <label>
    <slot :item="apiItem">{{ apiDataText }}</slot>
  </label>
</template>

<script>
import { isUndefined } from 'lodash'
import { LocalStorage } from 'ttl-localstorage'
import * as api from '@/lib/api'

export default {
  data: ()=>({
    apiItem: {}
  }),
  props: {
    apiUrl: {
      type: [String , Array],
      default: undefined
    },
    apiKey: {
      type: [String , Array, Number],
      default: undefined
    },
    apiField: {
      type: String,
      default: undefined
    },
    withTrashed: {
      type: Boolean,
      default: true
    }
  },
  asyncComputed: {
    apiDataText() {
      return new Promise((resolve)=>{
        if (!isUndefined(this.apiUrl) && !isUndefined(this.apiKey) && !isUndefined(this.apiField)) {
          
          let cacheKey = JSON.stringify({apiUrl: this.apiUrl,apiKey: this.apiKey})
          LocalStorage.keyExists(cacheKey).then((res)=>{
            if (res) {
              LocalStorage.get(cacheKey).then((returnData)=>{
                this.apiItem = returnData
                resolve(returnData[this.apiField])
              })
            } else {
              api.post(this.apiUrl,{key: this.apiKey, withTrashed: this.withTrashed},{},true).then((returnData)=>{
                this.apiItem = returnData.data
                resolve(returnData.data[this.apiField])
                LocalStorage.put(cacheKey,returnData.data,300)
              }).catch(()=>{
                this.apiItem = {}
                resolve()
              })
            }
          })
        } else {
          this.apiItem = {}
          resolve()
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
