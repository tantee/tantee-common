import Vue from 'vue'
import api from 'tantee-common/lib/api'
import { isUndefined,differenceBy,castArray,findIndex,merge } from 'lodash'

export default {
  data: () => ({
    apiBaseUrl: {},
    apiCustomUrl: {},
    apiData: {},
    apiErrors: {},
  }),
  props: {
    apiWith: {
      type: [String,Array],
      default: undefined
    },
    apiOrderBy: {
      type: String,
      default: undefined
    },
    apiScope: {
      type: String,
      default: undefined
    },
    apiScopeParam: {
      type: [Number,String,Array],
      default: undefined
    },
    apiUrl: {
      type: Object,
      default: ()=>({})
    }
  },
  watch: {
    apiUrl: {
      handler(newValue) {
        this.apiCustomUrl = Object.assign({},newValue)
      },
      deep: true
    }
  },
  beforeMount() {
    this.apiCustomUrl = Object.assign({}, this.apiUrl)
  },
  methods: {
    createAPI: function(apiName,createObject,dataKey='id') {
      return new Promise((resolve,reject)=>{
        let apiUrl = (isUndefined(this.apiBaseUrl[apiName])) ? '' : api.urlBuilder(this.apiBaseUrl[apiName],'create')
        if (!isUndefined(this.apiCustomUrl['create'])) apiUrl = api.urlBuilder(this.apiCustomUrl['create'])

        if (apiUrl !== '') {
          Vue.set(this.apiErrors,apiName,[])
          let config = {}
          if (!isUndefined(this.apiWith)) {
            merge(config,{
              params: {
                with: this.apiWith
              }
            })
          }
          api.post(apiUrl,createObject,config).then((returnData)=>{
            if (!returnData.success) {
              Vue.set(this.apiErrors,apiName,returnData.errorTexts)

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to save data'
              })
              reject(returnData.errorTexts)
            } else {
              if (!isUndefined(this.apiData[apiName])) {
                returnData.data.forEach((updatedRow)=>{
                  let matchedIndex = findIndex(this.apiData[apiName], [dataKey, updatedRow[dataKey]])
                  if (matchedIndex >= 0) {
                    this.apiData[apiName].splice(matchedIndex, 1, updatedRow);
                  } else {
                    this.apiData[apiName].push(updatedRow)
                  }
                })
              } else {
                Vue.set(this.apiData,apiName,returnData.data)
              }

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully save data'
              })
              resolve(returnData)
            }
          })
          .catch((e)=>{
            void e
            reject([{errorText: 'API Communication error'}])
          })
        } else {
          reject('Invalid API url')
        }
      })
    },
    replaceAPI: function(apiName,createObject,dataKey='id') {
      return new Promise((resolve,reject)=>{
        let apiUrl = (isUndefined(this.apiBaseUrl[apiName])) ? '' : api.urlBuilder(this.apiBaseUrl[apiName],'replace')
        if (!isUndefined(this.apiCustomUrl['replace'])) apiUrl = api.urlBuilder(this.apiCustomUrl['replace'])

        if (apiUrl !== '') {
          Vue.set(this.apiErrors,apiName,[])
          let config = {}
          if (!isUndefined(this.apiWith)) {
            merge(config,{
              params: {
                with: this.apiWith
              }
            })
          }
          api.post(apiUrl,createObject,config).then((returnData)=>{
            if (!returnData.success) {
              Vue.set(this.apiErrors,apiName,returnData.errorTexts)

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to save data'
              })
              reject(returnData.errorTexts)
            } else {
              if (!isUndefined(this.apiData[apiName])) {
                returnData.data.forEach((updatedRow)=>{
                  let matchedIndex = findIndex(this.apiData[apiName], [dataKey, updatedRow[dataKey]])
                  if (matchedIndex >= 0) {
                    this.apiData[apiName].splice(matchedIndex, 1, updatedRow);
                  } else {
                    this.apiData[apiName].push(updatedRow)
                  }
                })
              } else {
                Vue.set(this.apiData,apiName,returnData.data)
              }

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully save data'
              })
              resolve(returnData)
            }
          })
          .catch((e)=>{
            void e
            reject([{errorText: 'API Communication error'}])
          })
        } else {
          reject('Invalid API url')
        }
      })
    },
    readAPI: function(apiName,apiUrl,perPage=-1,page=1) {
      return new Promise((resolve,reject)=>{
        this.setAPIbaseUrl(apiName,apiUrl)
        if (!isUndefined(this.apiCustomUrl['read'])) apiUrl = api.urlBuilder(this.apiCustomUrl['read'])

        if (api.urlBuilder(apiUrl) !== '') {
          let getData = {}
          if (!isUndefined(perPage) && perPage > 0) {
            getData = {
              perPage: perPage,
              page : page || 1
            }
          }
          if (!isUndefined(this.apiWith)) {
            merge(getData,{
              with: this.apiWith
            })
          }
          if (!isUndefined(this.apiOrderBy)) {
            merge(getData,{
              orderBy: this.apiOrderBy
            })
          }
          if (!isUndefined(this.apiScope)) {
            merge(getData,{
              scope: this.apiScope
            })
          }
          if (!isUndefined(this.apiScopeParam)) {
            merge(getData,{
              scopeParam: this.apiScopeParam
            })
          }
          Vue.set(this.apiErrors,apiName,[])
          api.get(apiUrl,getData).then((returnData)=>{
            if (!returnData.success) {
              Vue.set(this.apiErrors,apiName,returnData.errorTexts)
              reject(returnData.errorTexts)
            } else {
              Vue.set(this.apiData,apiName,returnData.data)
              resolve(returnData)
            }
          })
          .catch((e)=>{
            void e
            reject([{errorText: 'API Communication error'}])
          })
        } else {
          reject('Invalid API url')
        }
      })
    },
    refreshAPI: function(apiName,refreshObject=undefined,dataKey='id') {
      return new Promise((resolve,reject)=>{
        let apiUrl = (isUndefined(this.apiBaseUrl[apiName])) ? '' : api.urlBuilder(this.apiBaseUrl[apiName], 'find')
        if (apiUrl == '') reject([{ errorText: 'No refresh url' }])
        else {
          if (!isUndefined(refreshObject)) {
            let findData = {
              key: refreshObject[dataKey]
            }
            let config = {}
            if (!isUndefined(this.apiWith)) {
              config = Object.assign(config,{
                params: {
                  with: this.apiWith
                }
              })
            }
            Vue.set(this.apiErrors,apiName,[])
            api.post(apiUrl,findData,config).then((returnData)=>{
              if (!returnData.success) {
                Vue.set(this.apiErrors,apiName,returnData.errorTexts)

                this.$store.dispatch('addAlertItem',{
                  alertLocation: 'top',
                  alertType: 'error',
                  alertText: 'Failed to refresh data'
                })
                reject(returnData.errorTexts)
              } else {
                if (!isUndefined(this.apiData[apiName])) {
                  let matchedIndex = findIndex(this.apiData[apiName], [dataKey, returnData.data[dataKey]])
                  if (matchedIndex >= 0) {
                    this.apiData[apiName].splice(matchedIndex, 1, returnData.data);
                  } else {
                    this.apiData[apiName].push(returnData.data)
                  }
                }
                resolve(returnData)
              }
            })
            .catch((e)=>{
              void e
              reject([{errorText: 'API Communication error'}])
            })
          } else {
            reject([{ errorText: 'No object provided' }])
          }
        }
      })
    },
    updateAPI: function(apiName,updateObject=undefined,dataKey='id',returnData=true) {
      return new Promise((resolve,reject)=>{
        let apiUrl = (isUndefined(this.apiBaseUrl[apiName])) ? '' : api.urlBuilder(this.apiBaseUrl[apiName],'update')
        if (!isUndefined(this.apiCustomUrl['update'])) apiUrl = api.urlBuilder(this.apiCustomUrl['update'])

        if (apiUrl !== '') {
          let postData = {}
          if (isUndefined(updateObject)) {
            postData = this.apiData[apiName]
          } else {
            postData = updateObject
          }
          let config = {
            params : {
              returnData: Number(returnData)
            }
          }
          if (!isUndefined(this.apiWith)) {
            merge(config,{
              params: {
                with: this.apiWith
              }
            })
          }
          Vue.set(this.apiErrors,apiName,[])
          api.post(apiUrl,postData,config).then((returnData)=>{
            if (!returnData.success) {
              Vue.set(this.apiErrors,apiName,returnData.errorTexts)

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to save data'
              })
              reject(returnData.errorTexts)
            } else {
              if (!isUndefined(this.apiData[apiName])) {
                returnData.data.forEach((updatedRow)=>{
                  let matchedIndex = findIndex(this.apiData[apiName], [dataKey, updatedRow[dataKey]])
                  if (matchedIndex >= 0) {
                    this.apiData[apiName].splice(matchedIndex, 1, updatedRow);
                  } else {
                    this.apiData[apiName].push(updatedRow)
                  }
                })
              } else {
                Vue.set(this.apiData,apiName,returnData.data)
              }

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully save data'
              })
              resolve(returnData)
            }
          })
          .catch((e)=>{
            reject([{errorText: 'API Communication error'}])
          })
        } else {
          reject('Invalid API url')
        }
      })
    },
    deleteAPI: function(apiName,deleteObject,dataKey='id') {
      return new Promise((resolve,reject)=>{
        let apiUrl = (isUndefined(this.apiBaseUrl[apiName])) ? '' : api.urlBuilder(this.apiBaseUrl[apiName],'delete')
        if (!isUndefined(this.apiCustomUrl['delete'])) apiUrl = api.urlBuilder(this.apiCustomUrl['delete'])

        if (apiUrl !== '') {
          Vue.set(this.apiErrors,apiName,[])
          api.post(apiUrl,deleteObject).then((returnData)=>{
            if (!returnData.success) {
              Vue.set(this.apiErrors,apiName,returnData.errorTexts)

              this.$store.dispatch('addAlertItem',{
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to delete data'
              })
              reject(returnData.errorTexts)
            } else {
              if (!isUndefined(this.apiData[apiName])) {
                this.apiData[apiName] = differenceBy(this.apiData[apiName],castArray(deleteObject),dataKey)

                this.$store.dispatch('addAlertItem',{
                  alertLocation: 'top',
                  alertType: 'success',
                  alertText: 'Successfully delete data'
                })
              }
              resolve(returnData)
            }
          })
          .catch((e)=>{
            void e
            reject([{errorText: 'API Communication error'}])
          })
        } else {
          reject('Invalid API url')
        }
      })
    },
    searchAPI: function(apiName,searchData,perPage=-1,page=1,orderBy=undefined) {
      return new Promise((resolve,reject)=>{
        let apiUrl = (isUndefined(this.apiBaseUrl[apiName])) ? '' : api.urlBuilder(this.apiBaseUrl[apiName],'search')
        if (!isUndefined(this.apiCustomUrl['search'])) apiUrl = api.urlBuilder(this.apiCustomUrl['search'])

        if (apiUrl !== '') {
          let config = {}
          if (!isUndefined(perPage) && perPage > 0) {
            config.params = {
              perPage: perPage,
              page : page || 1
            }
          }
          if (!isUndefined(this.apiWith)) {
            merge(config,{
              params: {
                with: this.apiWith
              }
            })
          }
          if (!isUndefined(this.apiOrderBy)) {
            merge(config,{
              params: {
                orderBy: this.apiOrderBy
              }
            })
          }
          if (!isUndefined(this.apiScope)) {
            merge(config,{
              params: {
                scope: this.apiScope
              }
            })
          }
          if (!isUndefined(this.apiScopeParam)) {
            merge(config,{
              params: {
                scopeParam: this.apiScopeParam
              }
            })
          }
          Vue.set(this.apiErrors,apiName,[])
          api.post(apiUrl,searchData,config).then((returnData)=>{
            if (!returnData.success) {
              Vue.set(this.apiErrors,apiName,returnData.errorTexts)
              reject(returnData.errorTexts)
            } else {
              Vue.set(this.apiData,apiName,returnData.data)
              resolve(returnData)
            }
          })
          .catch((e)=>{
            void e
            reject([{errorText: 'API Communication error'}])
          })
        } else {
          reject('Invalid API url')
        }
      })
    },
    setAPIbaseUrl: function(apiName, apiBaseUrl) {
      Vue.set(this.apiBaseUrl,apiName,apiBaseUrl)
    }
  }

}
