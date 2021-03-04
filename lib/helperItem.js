import { api } from 'tantee-common'
import { isUndefined, merge } from 'lodash'
import * as helper from './helperItem'

export function findItem(apiBaseUrl,keyValue,apiWith=undefined) {
  return new Promise((resolve, reject) => {
    let apiUrl = (isUndefined(apiBaseUrl)) ? '' : api.urlBuilder(apiBaseUrl, 'find')

    if (apiUrl !== '') {
      let config = {}
      if (!isUndefined(apiWith)) {
        merge(config, {
          params: {
            with: apiWith
          }
        })
      }
      api.post(apiUrl, {key: keyValue}, config).then((returnData) => {
        if (!returnData.success) {
          reject(returnData.errorTexts)
        } else {
          resolve(returnData.data)
        }
      })
      .catch((e) => {
        void e
        reject([{ errorText: 'API Communication error' }])
      })
    } else {
      reject('Invalid API url')
    }
  })
}

export function firstItem(apiBaseUrl, searchQuery, apiWith = undefined) {
  return new Promise((resolve, reject) => {
    let apiUrl = (isUndefined(apiBaseUrl)) ? '' : api.urlBuilder(apiBaseUrl, 'first')

    if (apiUrl !== '') {
      let config = {}
      if (!isUndefined(apiWith)) {
        merge(config, {
          params: {
            with: apiWith
          }
        })
      }
      api.post(apiUrl, searchQuery, config).then((returnData) => {
        if (!returnData.success) {
          reject(returnData.errorTexts)
        } else {
          resolve(returnData.data)
        }
      })
      .catch((e) => {
        void e
        reject([{ errorText: 'API Communication error' }])
      })
    } else {
      reject('Invalid API url')
    }
  })
}

export function searchItem(apiBaseUrl, searchQuery, apiWith = undefined, apiOrderBy = undefined, apiScope = undefined, apiScopeParam = undefined) {
  return new Promise((resolve, reject) => {
    let apiUrl = (isUndefined(apiBaseUrl)) ? '' : api.urlBuilder(apiBaseUrl, 'search')

    if (apiUrl !== '') {
      let config = {}
      if (!isUndefined(apiWith)) {
        merge(config, {
          params: {
            with: apiWith
          }
        })
      }
      if (!isUndefined(apiOrderBy)) {
        merge(config,{
          params: {
            orderBy: apiOrderBy
          }
        })
      }
      if (!isUndefined(apiScope)) {
        merge(config,{
          params: {
            scope: apiScope
          }
        })
      }
      if (!isUndefined(apiScopeParam)) {
        merge(config,{
          params: {
            scopeParam: apiScopeParam
          }
        })
      }
      api.post(apiUrl, searchQuery, config).then((returnData) => {
        if (!returnData.success) {
          reject(returnData.errorTexts)
        } else {
          resolve(returnData.data)
        }
      })
        .catch((e) => {
          void e
          reject([{ errorText: 'API Communication error' }])
        })
    } else {
      reject('Invalid API url')
    }
  })
}

export function updateItem(apiBaseUrl, updateObject, apiWith = undefined) {
  return new Promise((resolve, reject) => {
    let apiUrl = (isUndefined(apiBaseUrl)) ? '' : api.urlBuilder(apiBaseUrl, 'update')

    if (apiUrl !== '') {
      let postData = updateObject
      let config = {
        params: {
          returnData: 1
        }
      }
      if (!isUndefined(apiWith)) {
        merge(config, {
          params: {
            with: apiWith
          }
        })
      }
      api.post(apiUrl, postData, config).then((returnData) => {
        if (!returnData.success) {
          reject(returnData.errorTexts)
        } else {
          resolve(returnData.data[0])
        }
      })
        .catch((e) => {
          reject([{ errorText: 'API Communication error' }])
        })
    } else {
      reject('Invalid API url')
    }
  })
}

export function existItem(apiBaseUrl, searchQuery, apiScope = undefined, apiScopeParam = undefined) {
  return new Promise((resolve, reject) => {
    let apiUrl = (isUndefined(apiBaseUrl)) ? '' : api.urlBuilder(apiBaseUrl, 'exist')

    if (apiUrl !== '') {
      let config = {}
      if (!isUndefined(apiScope)) {
        merge(config,{
          params: {
            scope: apiScope
          }
        })
      }
      if (!isUndefined(apiScopeParam)) {
        merge(config,{
          params: {
            scopeParam: apiScopeParam
          }
        })
      }
      api.post(apiUrl, searchQuery, config).then((returnData) => {
        if (!returnData.success) {
          reject(returnData.errorTexts)
        } else {
          resolve(returnData.data[0])
        }
      })
        .catch((e) => {
          void e
          reject([{ errorText: 'API Communication error' }])
        })
    } else {
      reject('Invalid API url')
    }
  })
}

export default helper
