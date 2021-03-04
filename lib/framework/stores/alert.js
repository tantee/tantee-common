import _ from 'lodash'

const alert = {
  state: {
    alertItems: [],
    availableLocation: [],
    defaultLocation: "default",
    defaultType: "info",
    defaultExpireIn : 1000 * 60,
    isTimerStarted: false
  },
  mutations: {
    addAlertItem(state,Item) {
      if (!_.isUndefined(Item.alertText)) {
        let alertItem = {
          alertLocation: (!_.isUndefined(Item.alertLocation) && (state.availableLocation.indexOf(Item.alertLocation)!="-1")) ? Item.alertLocation : state.defaultLocation,
          alertType: (!_.isUndefined(Item.alertType)) ? Item.alertType : state.defaultType,
          alertText: Item.alertText,
          alertIcon: (!_.isUndefined(Item.alertIcon)) ? Item.alertIcon : null,
          alertDateTime: _.now(),
          alertExpireIn: (!_.isUndefined(Item.alertExpireIn)) ? Item.alertExpireIn : state.defaultExpireIn,
        }
        let newItems = state.alertItems
        newItems.push(alertItem)
        state.alertItems = newItems
      }
    },
    removeAlertItem(state,Item) {
      state.alertItems = _.without(state.alertItems,Item)
    },
    clearExpiredAlertItem(state) {
      state.alertItems = _.filter(state.alertItems,(Item) => Item.alertDateTime+Item.alertExpireIn > _.now())
    },
    registerLocation(state,alertLocation) {
      if (state.availableLocation.indexOf(alertLocation)=="-1") {
        let newAvailableLocation = state.availableLocation
        newAvailableLocation.push(alertLocation)
        state.availableLocation = newAvailableLocation
      }
    },
  },
  actions: {
    addAlertItem({commit},Item) {
      commit('addAlertItem',Item)
    },
    removeAlertItem({commit},Item) {
      commit('removeAlertItem',Item)
    },
    startAlertTimer({commit,state}) {
      if (!state.isTimerStarted) {
        setInterval(() => {
          commit('clearExpiredAlertItem')
        }, 1000 * 5)
      }
    }
  },
  getters: {
    getAlertByLocation: (state) => (location) => {
      let returnItem = state.alertItems.filter((Item) => Item.alertLocation == location)
      returnItem = returnItem.sort((a,b) => {return -1*(a.alertDateTime - b.alertDateTime)})
      return returnItem
    },
    getAlertCountByLocation: (state) => (location) => {
      let returnItem = state.alertItems.filter((Item) => Item.alertLocation == location)
      return returnItem.length
    }
  }
}

export default alert
