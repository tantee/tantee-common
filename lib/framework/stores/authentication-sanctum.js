import { isUndefined,castArray } from 'lodash'
import api from 'tantee-common/lib/api'
import Vue from 'vue'

const authentication = {
  state: {
    accessToken: undefined,
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
      state.accessToken = token
    },
    setCurrentUser(state,userData) {
      state.currentUser = { ...userData }
    },
    logout(state) {
      state.accessToken = undefined
      state.currentUser = undefined
      state.currentRole = undefined
      state.currentPermission = undefined
    }
  },
  actions: {
    login({commit,state,dispatch},loginData) {
      return new Promise((resolve)=>{
        api.post(['user','login'],loginData,undefined,true).then((returnData)=>{
          if (returnData.success) {
            commit('setToken',returnData.data.token)
            commit('setCurrentUser',returnData.data.userData)
            resolve(true)
          } else {
            dispatch('logout').then(()=>{
              resolve(false)
            })
          }
        }).catch((e)=>{
          void e
          dispatch('logout').then(()=>{
            resolve(false)
          })
        })
      })
    },
    logout({commit}) {
      return new Promise((resolve)=>{
        api.post(['user','logout'],undefined,undefined,true).then(()=>{
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
        api.post(['user']).then((returnData)=>{
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
  }
}

export default authentication
