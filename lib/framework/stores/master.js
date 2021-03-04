import { isUndefined,find,filter } from 'lodash'
import api from 'tantee-common/lib/api'
import Vue from 'vue'

const master = {
  state: {
    master: {},
    groupKey: {},
  },
  mutations: {
    LoadMasters(state,master) {
      Vue.set(state.master, master.meta.groupKey + "___" + master.meta.filterText, master.data)
    },
    addGroupKey(state,Item) {
      if (!isUndefined(Item)) {
        Vue.set(state,'groupKey',Item)
      }
    },
  },
  actions: {
    LoadMasters({commit},master) {
      return new Promise((resolve)=>{
        let apiUrl = ['Master','MasterController','getMasterItems']
        let MasterData = null

        api.get(apiUrl,master).then((returnData) => {
          if (returnData.success) {
            MasterData = returnData.data
            MasterData.forEach((Master,index)=>{
              if (Master.itemValueEN == null) {
                MasterData[index].itemValueEN = MasterData[index].itemValue
              }
            })
            commit('LoadMasters', { meta: master, data: MasterData })
          }
        })
        .catch((e) => void e)
        .finally(()=>{
          resolve()
        })
      })
    }
  },
  getters: {
    getGroupKey: (state) => (groupKey) => {
      if (!isUndefined(state.groupKey[groupKey])) return state.groupKey[groupKey]
      else return groupKey
    },
    getMasters: (state,getters) => async (groupKey,filterText=undefined) => {
      let apiUrl = ['Master','MasterController','getMasterItems']
      let MasterData = []

      groupKey = getters.getGroupKey(groupKey)

      if (isUndefined(state.master[groupKey+"___"+filterText])) {
        if (!isUndefined(state.master[groupKey+"___undefined"])) {
          MasterData = filter(state.master[groupKey+"___undefined"],['filterText',filterText])
          Vue.set(state.master,groupKey+"___"+filterText,MasterData)
        } else {
          let masterQuery = {
            groupKey: groupKey,
            filterText: filterText
          }
          await api.get(apiUrl,masterQuery).then((returnData) => {
            if (returnData.success) {
              MasterData = returnData.data
              MasterData.forEach((Master,index)=>{
                if (Master.itemValueEN == null) {
                  MasterData[index].itemValueEN = MasterData[index].itemValue
                }
              })
              Vue.set(state.master,groupKey+"___"+filterText,MasterData)
            }
          }).catch((e) => void e)
        }
      } else {
        MasterData = state.master[groupKey+"___"+filterText]
      }

      return MasterData
    },
    getItemCode: (state,getters) => async (groupKey,itemValue,filterText=undefined,isEnglish=false) => {
      let search = undefined
      if (isEnglish) search = {itemValueEN: itemValue}
      else search = {itemValue: itemValue}

      if (!isUndefined(filterText)) search['filterText'] = filterText

      let matchItem = undefined
      await getters.getMasters(groupKey,filterText).then((returnData)=>{
        matchItem = find(returnData,search)
      })
      if (isUndefined(matchItem)) return null
      else return matchItem.itemCode
    },
    getItemValue: (state,getters) => async (groupKey,itemCode,isEnglish=false) => {
      let search = {itemCode: itemCode}
      let matchItem = undefined
      await getters.getMasters(groupKey,undefined).then((returnData)=>{
        matchItem = find(returnData,search)
      })
      if (isUndefined(matchItem)) return null
      else {
        if (!isEnglish) return matchItem.itemValue
        else return matchItem.itemValueEN
      }
    },
  },
}

export default master
