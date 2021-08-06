import apiCRUD from 'tantee-common/mixins/apiCRUD'
import * as papa from 'papaparse'
import { isUndefined, cloneDeep, isArray, isObject, isEqual, mapValues } from 'lodash'
import FileSaver from 'file-saver'

export default {
  mixins: [apiCRUD],
  data: ()=>({
    isLoading: false,
    isImporting: false,
    isExporting: false,
    pagination: {},
    totalItems: undefined,
  }),
  props: {
    modelApi: {
      default: null,
      required: true
    },
    modelApiSearch: {
      default: undefined
    },
    modelCustomApi: {
      type: Object,
      default: undefined
    },
    modelName: {
      type: String,
      default: null,
      required: true
    },
    modelKey: {
      type: String,
      default: 'id',
    },
    modelTitle: {
      type: String,
      default: null,
    },
    initialData: {
      type: Object,
      default: undefined
    },
    serverPagination: {
      type: Boolean,
      default: false
    },
    rowsPerPageItems: {
      type: Array,
      default: () => { return [10,20,40,-1]}
    },
    forceReload: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onCreateData(formData,callback=undefined) {
      this.createAPI(this.modelName,formData,this.modelKey).then((returnData)=>{
        if (this.forceReload) this.loadData()
        if (!isUndefined(callback)) callback.done()
        this.$emit('dataCreated', returnData.data)
      }).catch((errors) => {
        if (!isUndefined(callback)) callback.error(errors)
      })
    },
    onReplaceData(formData,callback=undefined) {
      this.replaceAPI(this.modelName,formData,this.modelKey).then((returnData)=>{
        if (this.forceReload) this.loadData()
        if (!isUndefined(callback)) callback.done()
        this.$emit('dataCreated', returnData.data)
      }).catch((errors) => {
        if (!isUndefined(callback)) callback.error(errors)
      })
    },
    onUpdateData(formData,callback=undefined) {
      this.updateAPI(this.modelName,formData,this.modelKey).then((returnData)=>{
        if (this.forceReload) this.loadData()
        if (!isUndefined(callback)) callback.done()
        this.$emit('dataUpdated', returnData.data)
      }).catch((errors) => {
        if (!isUndefined(callback)) callback.error(errors)
      })
    },
    onImportData(files) {
      for (let i = 0; i < files.length; i++) {
        this.isImporting = true
        papa.parse(files[i],{
          header: true,
          trimHeaders: true,
          skipEmptyLines: true,
          transfrom: (value) => {return value.trim()},
          complete: (result) => {
            if (result.data.length>0) {
              result.data.forEach((data,index,arr) => {
                data = mapValues(data,(row)=>{
                  try {
                    return JSON.parse(row)
                  } catch(e) {
                    void e
                    return row
                  }
                })

                arr[index] = Object.assign({}, this.initialData, data)
              })
              this.onReplaceData(result.data,{
                done: () => {
                  this.isImporting = false
                },
                error: (errors) => {
                  errors.forEach((error) => {
                    this.$store.dispatch('addAlertItem',{
                      alertText: error,
                      alertType: 'error'
                    })
                  })
                  this.isImporting = false
                }
              })
            }
          }
        })
      }
    },
    onExportData() {
      let exportData = cloneDeep(this.apiData[this.modelName])
      if (isArray(exportData)) {
        exportData = exportData.map((item) => {
          return mapValues(item,(row)=>{
            return (isObject(row)) ? JSON.stringify(row) : row
          })
        })
      }
      let content = papa.unparse(exportData)
      var blob = new Blob([String.fromCharCode(0xFEFF),content], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, this.modelName + '.csv');
    },
    deleteData(object) {
      this.$confirm('ต้องการที่จะลบข้อมูล').then((res)=>{
        if (res) {
          this.deleteAPI(this.modelName,object,this.modelKey).then(()=>{
            if (this.forceReload) this.loadData()
            this.$emit('dataDeleted',object)
          }).catch((e)=>void e)
        }
      })
    },
    refreshData(object) {
      this.refreshAPI(this.modelName,object,this.modelKey)
    },
    loadData() {
      this.isLoading = true;
      let perPage = -1
      let Page = 1

      if (this.serverPagination) {
        perPage = this.pagination.perPage
        Page = this.pagination.page
      }

      if (isUndefined(this.modelApiSearch)) {
        this.readAPI(this.modelName,this.modelApi,perPage,Page).then((returnData)=>{
          if ((this.serverPagination) && (!isUndefined(returnData.meta))) {
            this.totalItems = returnData.meta.total
          }
        }).catch(()=>{
        }).finally(()=>{
          this.isLoading = false
        })
      } else {
        if (this.modelApiSearch==null) {
          this.isLoading = false
        } else {
          this.setAPIbaseUrl(this.modelName,this.modelApi)
          this.searchAPI(this.modelName,this.modelApiSearch,perPage,Page).then((returnData)=>{
            if ((this.serverPagination) && (!isUndefined(returnData.meta))) {
              this.totalItems = returnData.meta.total
            }
          }).catch(()=>{
          }).finally(()=>{
            this.isLoading = false
          })
        }
      }
    },
    getAllData() {
      return new Promise((resolve)=>{
        if (isUndefined(this.modelApiSearch)) {
          this.silentReadAPI(this.modelName,this.modelApi).then((returnData)=>{
            resolve(returnData)
          }).catch((e)=>{
            void e
            resolve([])
          })
        } else {
          if (this.modelApiSearch) {
            this.setAPIbaseUrl(this.modelName,this.modelApi)
            this.silentSearchAPI(this.modelName,this.modelApiSearch).then((returnData)=>{
              resolve(returnData)
            }).catch((e)=>{
              void e
              resolve([])
            })
          }
        }
      })
    }
  },
  watch: {
    pagination: {
      handler () {
        if (this.serverPagination) {
          this.loadData()
        }
      },
      deep: true
    },
    modelApi: {
      handler (newVal,oldVal) {
        if (!isEqual(newVal,oldVal)) {
          if (this.pagination && this.pagination.page) this.pagination.page = 1
          this.loadData()
        }
      },
      deep: true
    },
    modelApiSearch: {
      handler () {
        if (this.pagination && this.pagination.page) this.pagination.page = 1
        this.loadData()
      },
      deep: true
    },
    modelCustomApi: {
      handler (newVal) {
        this.apiCustomUrl = newVal
      },
      deep: true
    }
  }
}
