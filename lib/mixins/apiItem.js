import api from 'tantee-common'
import { isUndefined, merge, isEqual, cloneDeep } from 'lodash'

export default {
  data: () => ({
    apiBaseUrl: undefined,
    apiWith: undefined,
    apiCustomUrl: {},
    apiItemData: {},
    apiItemOriginal: {},
    apiErrors: [],
  }),
  computed: {
    isItemDataChange: function () {
      return !isEqual(this.apiItemData, this.apiItemOriginal)
    },
  },
  methods: {
    createItem: function (createObject, silent = false) {
      return new Promise((resolve, reject) => {
        let apiUrl = (isUndefined(this.apiBaseUrl)) ? '' : api.urlBuilder(this.apiBaseUrl, 'create')
        if (!isUndefined(this.apiCustomUrl['create'])) apiUrl = api.urlBuilder(this.apiCustomUrl['create'])

        if (apiUrl !== '') {
          this.apiErrors = []
          let config = {}
          if (!isUndefined(this.apiWith)) {
            merge(config, {
              params: {
                with: this.apiWith
              }
            })
          }
          api.post(apiUrl, createObject, config).then((returnData) => {
            if (!returnData.success) {
              this.apiErrors = returnData.errorTexts

              this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to save data'
              })
              reject(returnData.errorTexts)
            } else {
              this.apiItemData = cloneDeep(returnData.data[0])
              this.apiItemOriginal = cloneDeep(returnData.data[0])

              if (!silent) this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully save data'
              })
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
    },
    replaceItem: function (createObject, silent) {
      return new Promise((resolve, reject) => {
        let apiUrl = (isUndefined(this.apiBaseUrl)) ? '' : api.urlBuilder(this.apiBaseUrl, 'replace')
        if (!isUndefined(this.apiCustomUrl['replace'])) apiUrl = api.urlBuilder(this.apiCustomUrl['replace'])

        if (apiUrl !== '') {
          this.apiErrors = []
          let config = {}
          if (!isUndefined(this.apiWith)) {
            merge(config, {
              params: {
                with: this.apiWith
              }
            })
          }
          api.post(apiUrl, createObject, config).then((returnData) => {
            if (!returnData.success) {
              this.apiErrors = returnData.errorTexts

              this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to save data'
              })
              reject(returnData.errorTexts)
            } else {
              this.apiItemData = cloneDeep(returnData.data[0])
              this.apiItemOriginal = cloneDeep(returnData.data[0])

              if (!silent) this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully save data'
              })
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
    },
    findItem: function (keyValue, silent=false) {
      return new Promise((resolve, reject) => {
        let apiUrl = (isUndefined(this.apiBaseUrl)) ? '' : api.urlBuilder(this.apiBaseUrl, 'find')
        if (!isUndefined(this.apiCustomUrl['find'])) apiUrl = api.urlBuilder(this.apiCustomUrl['find'])

        if (apiUrl !== '') {
          this.apiErrors = []
          let config = {}
          if (!isUndefined(this.apiWith)) {
            merge(config, {
              params: {
                with: this.apiWith
              }
            })
          }

          this.apiItemData = {}
          this.apiItemOriginal = {}

          api.post(apiUrl, { key: keyValue }, config).then((returnData) => {
            if (!returnData.success) {
              this.apiErrors = returnData.errorTexts

              if (!silent) this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to retrieve data'
              })
              reject(returnData.errorTexts)
            } else {
              this.apiItemData = cloneDeep(returnData.data)
              this.apiItemOriginal = cloneDeep(returnData.data)

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
    },
    firstItem: function (searchQuery,silent=false) {
      return new Promise((resolve, reject) => {
        let apiUrl = (isUndefined(this.apiBaseUrl)) ? '' : api.urlBuilder(this.apiBaseUrl, 'first')
        if (!isUndefined(this.apiCustomUrl['first'])) apiUrl = api.urlBuilder(this.apiCustomUrl['first'])

        if (apiUrl !== '') {
          this.apiErrors = []
          let config = {}
          if (!isUndefined(this.apiWith)) {
            merge(config, {
              params: {
                with: this.apiWith
              }
            })
          }

          this.apiItemData = {}
          this.apiItemOriginal = {}

          api.post(apiUrl, searchQuery, config).then((returnData) => {
            if (!returnData.success) {
              this.apiErrors = returnData.errorTexts

              if (!silent) this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to retrieve data'
              })
              reject(returnData.errorTexts)
            } else {
              this.apiItemData = cloneDeep(returnData.data)
              this.apiItemOriginal = cloneDeep(returnData.data)

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
    },
    updateItem: function (updateObject = undefined, silent = false) {
      return new Promise((resolve, reject) => {
        let apiUrl = (isUndefined(this.apiBaseUrl)) ? '' : api.urlBuilder(this.apiBaseUrl, 'update')
        if (!isUndefined(this.apiCustomUrl['update'])) apiUrl = api.urlBuilder(this.apiCustomUrl['update'])

        if (apiUrl !== '') {
          let postData = {}
          if (isUndefined(updateObject)) {
            postData = this.apiItemData
          } else {
            postData = updateObject
          }
          let config = {
            params: {
              returnData: 1
            }
          }
          if (!isUndefined(this.apiWith)) {
            merge(config, {
              params: {
                with: this.apiWith
              }
            })
          }
          this.apiErrors = []
          api.post(apiUrl, postData, config).then((returnData) => {
            if (!returnData.success) {
              this.apiErrors = returnData.errorTexts

              this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to save data'
              })
              reject(returnData.errorTexts)
            } else {
              this.apiItemData = cloneDeep(returnData.data[0])
              this.apiItemOriginal = cloneDeep(returnData.data[0])

              if (!silent) this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully save data'
              })
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
    },
    deleteItem: function (deleteObject, silent = false) {
      return new Promise((resolve, reject) => {
        let apiUrl = (isUndefined(this.apiBaseUrl)) ? '' : api.urlBuilder(this.apiBaseUrl, 'delete')
        if (!isUndefined(this.apiCustomUrl['delete'])) apiUrl = api.urlBuilder(this.apiCustomUrl['delete'])

        if (apiUrl !== '') {
          this.apiErrors = []

          api.post(apiUrl, deleteObject).then((returnData) => {
            if (!returnData.success) {
              this.apiErrors = returnData.errorTexts

              this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'error',
                alertText: 'Failed to delete data'
              })
              reject(returnData.errorTexts)
            } else {
              this.apiItemData = {}
              this.apiItemOriginal = {}

              if (!silent) this.$store.dispatch('addAlertItem', {
                alertLocation: 'top',
                alertType: 'success',
                alertText: 'Successfully delete data'
              })
              resolve({})
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
    },
    resetItem() {
      this.apiItemData = {}
      this.apiItemOriginal = {}
      this.apiErrors = []
    }
  }
}
