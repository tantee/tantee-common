<template>
  <v-autocomplete v-bind:value="value" v-bind="$attrs" v-on="$listeners"
      :items="items" :loading="isLoading"
      :search-input.sync="search"
      :cache-items="!!customApi && !customApiEagerLoad"
      :item-text="itemText" :item-value="itemValue"
      :no-data-text="noDataText"
      :filter="(fuzzySearch) ? filterData : undefined"
      :multiple="multiple"
      :chips="chips"
      :deletable-chips="chips"
      ref="input"
  >
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </v-autocomplete>
</template>

<script>
import api from '#/api'
import { isUndefined,isEqual,isArray,includes,filter,debounce } from 'lodash'
import Fuse from 'fuse.js'

export default {
  data: ()=>({
    items: [],
    isLoading: false,
    search: null,
    debounceSearchCustomApi: undefined,
  }),
  props: {
    groupKey: {
      type: String,
      default: undefined
    },
    customApi: {
      type: [String, Array],
      default: undefined
    },
    customApiScope: {
      type: String,
      default: undefined
    },
    customApiScopeParam: {
      type: [Number,String, Array],
      default: undefined
    },
    customApiField: {
      type: [String, Array],
      default: undefined
    },
    customApiText: {
      type: String,
      default: undefined
    },
    customApiValue: {
      type: String,
      default: undefined
    },
    customApiEagerLoad: {
      type: Boolean,
      default: false
    },
    searchMinLength: {
      type: Number,
      default: 3
    },
    showOnly: {
      type: Array,
      default: undefined
    },
    showExcept: {
      type: Array,
      default: undefined
    },
    filterText: {
      type: [String, Array, Object],
      default: undefined
    },
    fuzzySearch: {
      type: Boolean,
      default: false
    },
    waitForFilter: {
      type: Boolean,
      default: false
    },
    waitForFilterText: {
      type: String,
      default: undefined
    },
    showCode: {
      type: Boolean,
      default: false
    },
    english: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    chips: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    },
    valueObject: {
      default: undefined
    }
  },
  watch: {
    filterText: {
      handler (newValue,oldValue) {
        if (!isEqual(newValue,oldValue)) this.loadData()
      },
      deep: true
    },
    showOnly: function() {
      this.loadData()
    },
    search: function(newValue) {
      if (!isUndefined(this.customApi) && !this.customApiEagerLoad && !!newValue && newValue.length>=this.searchMinLength) {
        this.debounceSearchCustomApi()
      }
    },
    customApiScopeParam: {
      handler (newValue,oldValue) {
        if (!isEqual(newValue,oldValue)) this.loadData()
      },
      deep: true
    },
    value: function (newValue) {
      if (!isUndefined(this.customApi) && !this.customApiEagerLoad && newValue) {

        let itemValueField = (isUndefined(this.customApi)) ? 'itemCode' : this.customApiValue

        if (this.$refs.input.selectedItems.length == 0) {
          this.search = newValue
          this.searchCustomApi()
        } else {
          if (this.multiple) this.$emit('update:valueObject',this.$refs.input.selectedItems)
          else this.$emit('update:valueObject',this.$refs.input.selectedItem)
        }
      } else {
        this.$nextTick(()=>{
          if (this.multiple) this.$emit('update:valueObject',this.$refs.input.selectedItems)
          else this.$emit('update:valueObject',this.$refs.input.selectedItem)
        })
      }
    },
  },
  computed: {
    itemText() {
      if (this.showCode) return (item) => {
        if (isUndefined(this.customApi)) return item['itemCode']+' - '+((this.english) ? item['itemValueEN'] : item['itemValue'])
        else return item[this.customApiValue]+' - '+item[this.customApiText]
      }
      else if (isUndefined(this.customApi)) return (this.english) ? 'itemValueEN' : 'itemValue'
      else return this.customApiText
    },
    itemValue() {
      if (isUndefined(this.customApi)) return 'itemCode'
      else return this.customApiValue
    },
    noDataText() {
      let text = undefined
      if (this.waitForFilter && isUndefined(this.filterText)) {
        text = this.waitForFilterText
      }
      if (!isUndefined(this.customApi) && !this.customApiEagerLoad && (!this.search || this.search.length<this.searchMinLength)) {
        text = 'enter at least ' + this.searchMinLength + ' letter(s)'
      }
      return text
    }
  },
  methods: {
    loadData: function() {
      if (!this.waitForFilter || !isUndefined(this.filterText)) {
        if (isUndefined(this.customApi)) {
          if (!isUndefined(this.groupKey) && (this.groupKey!=='')) {
            this.isLoading = true

            this.$store.getters.getMasters(this.groupKey,this.filterText).then((MasterData) => {
              if (!isUndefined(this.showOnly) && isArray(this.showOnly)) {
                MasterData = filter(MasterData,(o)=>{
                  return includes(this.showOnly,o['itemCode'])
                })
              }
              if (!isUndefined(this.showExcept) && isArray(this.showExcept)) {
                MasterData = filter(MasterData,(o)=>{
                  return !includes(this.showExcept,o['itemCode'])
                })
              }
              this.items = MasterData

              this.$nextTick(()=>{
                if (this.$refs.input) {
                  if (this.multiple) this.$emit('update:valueObject',this.$refs.input.selectedItems)
                  else this.$emit('update:valueObject',this.$refs.input.selectedItem)
                }
              })
            })
            .catch((e)=>{
              void e
              this.items = []
            })
            .finally(()=>{
              this.isLoading = false
            })
          }
        } else {
          if (this.customApiEagerLoad) this.searchCustomApi(true)
        }
      }
    },
    searchCustomApi: function(returnAll=undefined) {
      this.isLoading = true
      let searchData = {
        keyword: this.search,
        filter: this.filterText,
        all: returnAll,
      }
      if (!isUndefined(this.customApiField)) searchData['field'] = this.customApiField
      if (!isUndefined(this.customApiScope)) searchData['scope'] = this.customApiScope
      if (!isUndefined(this.customApiScopeParam)) searchData['scopeParam'] = this.customApiScopeParam
      return new Promise((resolve)=>{
        api.post(this.customApi,searchData).then((returnData)=>{
          if (returnData.success) {
            if (!isUndefined(this.showOnly) && isArray(this.showOnly)) {
              returnData.data = filter(returnData.data,(o)=>{
                return includes(this.showOnly,o[this.customApiValue])
              })
            }
            if (!isUndefined(this.showExcept) && isArray(this.showExcept)) {
              returnData.data = filter(returnData.data,(o)=>{
                return !includes(this.showExcept,o[this.customApiValue])
              })
            }
            this.items = returnData.data

            this.$nextTick(()=>{
              if (this.multiple) this.$emit('update:valueObject',this.$refs.input.selectedItems)
              else this.$emit('update:valueObject',this.$refs.input.selectedItem)
            })
          }
        })
        .catch((e)=>{
          void e
          this.items = []
        })
        .finally(()=>{
          this.isLoading = false
          resolve()
        })
      })
    },
    filterData: function(item, queryText, itemText) {
      let options = {
        shouldSort: true,
        threshold: 0.5,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: (isUndefined(this.customApi)) ? ['itemValue', 'itemValueEN','itemCode'] : [this.customApiText,this.customApiValue]
      }
      let fuse = new Fuse([item], options)
      return fuse.search(this.search).length
    }
  },
  mounted() {
    this.loadData()
    if (this.value && !isUndefined(this.customApi) && !this.customApiEagerLoad) {
      this.search = this.value
      this.searchCustomApi()
    }
  },
  beforeMount() {
    this.debounceSearchCustomApi = debounce(this.searchCustomApi,1000,{ leading: true })
  },
}
</script>

<style lang="css">
</style>
