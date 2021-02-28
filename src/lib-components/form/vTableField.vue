<template>
  <v-card :flat="flat">
    <v-toolbar flat v-if="!hideToolbar">
      <v-toolbar-title>
        {{ title }}
        <v-btn text icon color="grey lighten-1" @click="loadData" v-if="refreshable">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar-title>

      <slot name="toolBarItem"></slot>
      
      <v-spacer></v-spacer>
      <v-text-field class="pr-2" v-if="searchable" v-model="search" label="Search" append-icon="search" single-line hide-details></v-text-field>
      <v-file-btn class="mr-1" color="primary" @fileSelected="onImportData" :loading="isImporting" v-if="importable">Import CSV</v-file-btn>&nbsp;
      <v-form-dialog v-model="formDialog" :max-width="dialogWidth" :max-height="dialogHeight" :fullscreen="dialogFullscreen"
        :form-title="title" :object="currentObject" :initialData="initialData"
        @create="onCreateData" @update="onUpdateData"
        :insertable="computedInsertable"
        v-if="insertable && !readonly"
        ref="modelFormDialog"
      >
        <template v-slot="{data,rules,isCreating,isDataChange}">
          <slot name="dataForm" :data="data" :rules="rules" :isCreating="isCreating" :isDataChange="isDataChange"></slot>
        </template>
      </v-form-dialog>
    </v-toolbar>
    <v-card-title v-if="hideToolbar && title">
      <span class="title">{{ title }}</span>
    </v-card-title>
    <v-card-text>
      <v-data-table
        v-model="selected"
        :items="tableData"
        :item-key="itemKey"
        :headers="computedHeaders"
        :page.sync="pagination.page"
        :items-per-page.sync="pagination.perPage"
        :footer-props="{
            itemsPerPageOptions: rowsPerPageItems
          }"
        :loading="isLoading"
        :search="search"
        :show-expand="expandable"
        :show-select="multipleSelect"
        :hide-default-footer="hideActions"
        v-if="isShowing"
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope"><slot :name="slot" :actions="actions" v-bind="scope"/></template>
        <template v-slot:item.action="props" v-if="!('item.action' in $scopedSlots)">
          <v-icon class="mx-1" @click.stop="actions.editData(props.item)" v-if="insertable && !hideToolbar && !readonly">$vuetify.icons.edit</v-icon>
          <v-icon class="mx-1" color="red darken-3" @click.stop="actions.deleteData(props.item)" v-if="!readonly">$vuetify.icons.delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-text v-if="showCreatePad && !readonly" class=" pt-1 pb-1" @keyup.capture.enter="createDataPad">
      <v-container fluid pa-0>
        <v-row>
            <v-col cols="12" md="10" lg="11">
            <v-form-pad v-model="padData" ref="createPad" no-parent-validate>
              <template v-slot="{data, rules}">
                <slot name="createPad" :data="data" :rules="rules"></slot>
              </template>
            </v-form-pad>
          </v-col>
          <v-col cols="12" md="2" lg="1" class="text-right">
            <v-btn color="primary" @click="createDataPad" fab small><v-icon>add</v-icon></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import * as papa from 'papaparse'
import {isUndefined,isFunction,isArray,cloneDeep,assign,maxBy,findIndex} from 'lodash'

export default {
  data: ()=>({
    tableData: [],
    selected: [],
    isShowing: true,
    isLoading: false,
    isImporting: false,
    formDialog: false,
    currentObject: {},
    currentIndex: -1,
    pagination: {},
    search: undefined,
    padData: {},
  }),
  props: {
    hideToolbar: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null,
    },
    headers: {
      type: Array,
      default: undefined
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    rowsPerPageItems: {
      type: Array,
      default: () => { return [20,40,60,{text:'All',value:-1}]}
    },
    initialData: {
      type: Object,
      default: undefined
    },
    defaultData: {
      type: Object,
      default: ()=>({})
    },
    searchable: {
      type: Boolean,
      default: false
    },
    importable: {
      type: Boolean,
      default: false
    },
    insertable: {
      type: Boolean,
      default: true
    },
    limitTotalItems: {
      type: Number,
      default: undefined
    },
    expandable: {
      type: Boolean,
      default: false
    },
    refreshable: {
      type: Boolean,
      default: false
    },
    multipleSelect: {
      type: Boolean,
      default: false
    },
    dialogWidth: {
      type: String,
      default: '80vw'
    },
    dialogHeight: {
      type: String,
      default: '80vh'
    },
    dialogFullscreen: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => ([])
    },
    hideActions: {
      type: Boolean,
      default: false
    },
    showCreatePad: {
      type: Boolean,
      default: false
    },
    createPadHook: {
      type: Function,
      default: undefined
    },
    autoItemAction: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    actions() {
      return {
        createData: this.createData,
        editData: this.editData,
        deleteData: this.deleteData,
      }
    },
    computedHeaders() {
      let headers = cloneDeep(this.headers)
      if (this.expandable) headers.unshift({text: '',value: '',sortable: false,width: '30px'})
      if (this.autoItemAction) headers.push({text: 'Action',value: 'action',sortable: false})
      return headers
    },
    computedInsertable() {
      if (this.insertable) {
        if (isUndefined(this.limitTotalItems)) return true
        else return this.totalItems < this.limitTotalItems
      } else {
        return false
      }
    },
    totalItems() {
      return this.tableData.length
    }
  },
  methods: {
    onCreateData(formData,callback=undefined) {
      let tmpData = Object.assign(cloneDeep(this.defaultData),cloneDeep(formData))
      if (isUndefined(tmpData[this.itemKey])) {
        tmpData[this.itemKey] = (maxBy(this.tableData,this.itemKey)) ? maxBy(this.tableData,this.itemKey)[this.itemKey] + 1 : 1
      }
      let matchedIndex = findIndex(this.tableData, [this.itemKey, tmpData[this.itemKey]])
      if (matchedIndex >= 0) {
        this.tableData.splice(matchedIndex, 1, tmpData);
      } else {
        this.tableData.push(tmpData)
      }

      if (!isUndefined(callback)) callback.done()
    },
    onUpdateData(formData,callback=undefined) {
      if (this.currentIndex > -1) {
        assign(this.tableData[this.currentIndex],formData)
        if (!isUndefined(callback)) callback.done()
        this.currentIndex = -1
      }
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
              result.data.forEach((data) => {
                let tmpData = Object.assign(data,this.initialData)
                this.onCreateData(tmpData)
              })
            }
            this.isImporting = false
          }
        })
      }
    },
    createData(object) {
      this.onCreateData(object)
    },
    newData(object) {
      this.$refs.modelFormDialog.isCreating = true
      this.$nextTick(()=>{
        this.formDialog = true
        this.$nextTick(()=>{
          this.$nextTick(()=>{
            this.$refs.modelFormDialog.fillData(object)
          })
        })
      })
    },
    editData(object) {
      this.currentObject = object
      this.currentIndex = this.tableData.indexOf(object)
      this.$nextTick(()=>{
        this.formDialog = true
      })
    },
    deleteData(object) {
      this.$confirm('ต้องการที่จะลบข้อมูล').then((res)=>{
        if (res) {
          const index = this.tableData.indexOf(object)
          this.tableData.splice(index, 1)
        }
      })
    },
    createDataPad() {
      if (this.$refs.createPad.validate()) {
        let tmpCreateObject = this.padData
        if (!isUndefined(this.createPadHook) && isFunction(this.createPadHook)) {
          tmpCreateObject = this.createPadHook(this.padData)
        }
        this.onCreateData(tmpCreateObject,{done: this.resetPad})
      }
    },
    resetPad() {
      if (this.$refs.createPad) this.$refs.createPad.reset()
      this.padData = {}
    },
    reset() {
      this.tableData = []
      this.$emit("input",[])
      this.resetPad()
    },
    rowClick(row) {
      if (!this.multipleSelect) {
        if (!row.selected) this.selected = [row.item]
        else row.selected = false
      } else {
        row.selected = !row.selected
      }
    },
    loadData() {
      if (!isUndefined(this.value) && this.value!==null && isArray(this.value)) this.tableData = this.value
      else this.tableData = []

      this.isShowing = false

      this.$nextTick(()=>{
        if (this.hideActions) this.$set(this.pagination,'perPage',-1)
        else if (!this.pagination['perPage']) this.$set(this.pagination,'perPage',this.rowsPerPageItems[0])

        if (!this.pagination['page']) this.$set(this.pagination,'page',1)

        this.isShowing = true
      })
    }
  },
  watch: {
    selected: function(newVal) {
      this.$emit('selectItem',newVal)
    },
    value: {
      handler() {
        this.loadData()
      },
      deep: true
    },
    tableData: {
      handler(newVal) {
        this.$emit("input",newVal)
      },
      deep: true
    },
    hideActions: function(newVal) {
      if (newVal) this.pagination = { rowsPerPage: -1 }
    },
  },
  mounted() {
    this.loadData()
  }
}
</script>

<style lang="css">
.dt_collapse {
  -webkit-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
</style>
