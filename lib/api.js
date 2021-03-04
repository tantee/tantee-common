import axios from 'axios'
import { isUndefined,isPlainObject,isString,isArray,tail } from 'lodash'
import qs from 'qs'
import Store from '@/store'
import * as api from './api'

export function get(apiUrl,getData=undefined,config={},noerr=false,nestdata=true) {
  if (!isUndefined(getData)) {
    config['params'] = getData
  }
  return callAPI(apiUrl,'get',undefined,config,noerr,nestdata)
}

export function post(apiUrl,postData=undefined,config={},noerr=false,nestdata=true) {
  return callAPI(apiUrl,'post',postData,config,noerr,nestdata)
}

export function callAPI(apiUrl, method = 'get', postData = undefined, config = undefined, noerr = false, nestdata = true) {

  let returnData = {
    success: true,
    errorTexts: [],
    data: []
  }

  let callConfig = {
    method: method,
    url: urlBuilder(apiUrl),
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'brackets'})
    },
  }

  if (!isUndefined(postData)) {
    if (nestdata) {
      callConfig['data'] = {
        data : postData
      }
    } else {
      callConfig['data'] = postData
    }
  }

  if (!isUndefined(Store.getters.getToken)) {
    callConfig = Object.assign(callConfig,{
      headers: {
        'Authorization': 'Bearer ' + Store.getters.getToken
      }
    })
  }

  if (!isUndefined(config)) {
    callConfig = Object.assign(callConfig,config)
  }

  return new Promise((resolve,reject)=>{
    axios(callConfig).then((response)=>{
      if (response.data.success) {
        returnData = Object.assign(returnData,response.data)
        returnData.success = true
      } else {
        if (!isUndefined(response.data.success)) {
          returnData = Object.assign(returnData,response.data)
        } else {
          returnData.data = response.data
          returnData.success = true
        }
        if (isUndefined(response.data.success) && response.status!=200) {
          returnData.success = false
        }
      }
      resolve(returnData)
    }).catch((error)=>{
      let errorMsg = ''
      returnData.success = false

      if (!noerr) {
        if (error.response) {
          errorMsg = 'Error '+error.response.status
          if (isPlainObject(error.response.data)) {
            if (!isUndefined(error.response.data.message)) errorMsg = errorMsg +" : " + error.response.data.message
          }
        } else {
          errorMsg = error.message
        }
        Store.dispatch('addAlertItem',{
          alertText: errorMsg,
          alertType: 'error'
        })
      }

      reject(returnData)
    })
  })
}

export function urlBuilder(apiUrl,apiAction='') {
  const availMethod = new Set(['create','update','delete','search','replace','find','first','exist'])
  let returnUrl = ''
  let apiServer = ''
  let apiUri = []

  if (!isString(apiUrl)) {
    if (isArray(apiUrl)) {
      if (!isUndefined(Store.getters.getConfig('api')[apiUrl[0]])) {
        apiServer = Store.getters.getConfig('api')[apiUrl[0]].url
        apiUri = tail(apiUrl)
      } else{
        apiServer = Store.getters.getConfig('api').default.url
        apiUri = apiUrl
      }
      returnUrl = [apiServer, ...apiUri].join('/')
    }
  } else {
    returnUrl = apiUrl
  }

  if (availMethod.has(apiAction)) returnUrl = returnUrl + '/' + apiAction

  return returnUrl
}

export default api