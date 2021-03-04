import { isUndefined,castArray } from 'lodash'
import api from 'tantee-common/lib/api'
import Vue from 'vue'

const authentication = {
  state: {
    accessToken: undefined,
    refreshToken: undefined,
    expiresIn: undefined,
    currentUser: undefined,
    currentRole: undefined,
    currentPermission: undefined,
  },
  getters: {
    getToken: (state) => {
      return state.accessToken
    },
    getCurrentUser: (state) => {
      return state.currentUser
    },
    checkPermission: (state) => (permission) => {
      if (isUndefined(state.currentUser)) return false
      if (isUndefined(state.currentUser.permissions)) return false

      if (castArray(state.currentUser.roles).includes('superadmin')) return true

      if (isUndefined(permission) || (permission==null) || castArray(state.currentUser.permissions).includes(permission)) return true
      else return false
    },
  },
  mutations: {
    setToken(state,token) {
      state.accessToken = token.accessToken
      state.refreshToken = token.refreshToken
      state.expiresIn = token.expiresIn
    },
    setCurrentUser(state,userData) {
      state.currentUser = { ...userData }
    },
    logout(state) {
      state.accessToken = undefined
      state.refreshToken = undefined
      state.expiresIn = undefined
      state.currentUser = undefined
      state.currentRole = undefined
      state.currentPermission = undefined
    }
  },
  actions: {
    login({commit,state,rootState,dispatch},loginData) {
      return new Promise((resolve,reject)=>{
        let loginFormData = new FormData()
        loginFormData.set('grant_type','password')
        loginFormData.set('client_id',rootState.config.api.authentication.clientId)
        loginFormData.set('client_secret',rootState.config.api.authentication.clientSecret)
        loginFormData.set('username',loginData.username)
        loginFormData.set('password',loginData.password)
        loginFormData.set('scope','')

        let callConfig = {
          method: 'post',
          url: api.urlBuilder(['authentication','token']),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: loginFormData
        }
        Vue.axios(callConfig).then((response)=>{
          if (response.status == 200) {
            commit('setToken',{
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
              expiresIn: response.data.expires_in,
            })
            dispatch('setRefreshTokenTimer',response.data.expires_in)
            dispatch('loadCurrentUser').then(()=>{
              resolve(true)
            })
          } else {
            dispatch('logout').then(()=>{
              resolve(false)
            })
          }
        }).catch(()=>{
          dispatch('logout').then(()=>{
            resolve(false)
          })
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve)=>{
        api.get(['user','logout'],undefined,undefined,true).then(()=>{
        }).catch((e)=>void e)
        .finally(()=>{
          commit('logout')
          resolve()
        })
      })
    },
    verify({ commit }, loginData) {
      return new Promise((resolve,reject)=>{
        api.post(['user', 'verify'], loginData).then((returnData)=>{
          resolve(returnData["success"])
        }).catch((e)=> {
          void e
          reject()
        })
      })
    },
    loadCurrentUser({commit,state,dispatch}) {
      return new Promise((resolve)=>{
        api.get(['user']).then((returnData)=>{
          if (returnData.success) {
            commit('setCurrentUser',returnData.data)
            resolve(true)
          } else {
            resolve(false)
          }
        }).catch(()=>{
          dispatch('logout').then(()=>{
            resolve(false)
          })
        })
      })
    },
    refrestToken({commit,state,rootState,dispatch}) {
      let loginFormData = new FormData()
      loginFormData.set('grant_type','refresh_token')
      loginFormData.set('client_id',rootState.config.api.authentication.clientId)
      loginFormData.set('client_secret',rootState.config.api.authentication.clientSecret)
      loginFormData.set('refresh_token',state.refreshToken)
      loginFormData.set('scope','')

      let callConfig = {
        method: 'post',
        url: api.urlBuilder(['authentication','token']),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: loginFormData
      }
      Vue.axios(callConfig).then((response)=>{
        if (response.status == 200) {
          commit('setToken',{
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expiresIn: response.data.expires_in,
          })
          dispatch('setRefreshTokenTimer',response.data.expires_in)
        } else {
          dispatch('logout')
        }
      }).catch(()=>{
        dispatch('logout')
      })
    },
    setRefreshTokenTimer({commit,state,dispatch},expiresIn) {
      setTimeout(()=>{
        dispatch('refrestToken')
      }, 1000 * (expiresIn - 180))
    }
  }
}

export default authentication
