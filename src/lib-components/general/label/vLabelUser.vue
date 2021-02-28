<template>
  <label>
    {{ apiDataText }}
  </label>
</template>

<script>
import { isUndefined } from 'lodash'
import { LocalStorage } from 'ttl-localstorage'
import * as api from '@/lib/api'

export default {
  props: {
    username: {
      type: String,
      default: undefined
    },
  },
  asyncComputed: {
    apiDataText() {
      return new Promise((resolve)=>{
        if (!isUndefined(this.username)) {
          let apiUrl = ['models','User','Users','first']
          let apiData = {username: this.username}
          let cacheKey = JSON.stringify({apiUrl: apiUrl,apiData: apiData})
          LocalStorage.keyExists(cacheKey).then((res)=>{
            if (res) {
              LocalStorage.get(cacheKey).then((returnData)=>{
                resolve(returnData["name"]+", "+this.username)
              })
            } else {
              api.post(apiUrl,apiData,{},true).then((returnData)=>{
                if (returnData.data["name"]) {
                  resolve(returnData.data["name"]+", "+this.username)
                  LocalStorage.put(cacheKey,returnData.data,300)
                } else {
                  resolve(this.username)
                }
              }).catch(()=>{
                resolve(this.username)
              })
            }
          })
        } else {
          resolve(this.username)
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
