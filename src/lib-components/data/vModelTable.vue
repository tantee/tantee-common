<template>
  <v-card :flat="flat">
    <v-toolbar v-if="!hideToolbar" flat>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
      <v-toolbar-title>
        <v-btn text icon color="grey lighten-1" @click="loadData" v-if="refreshable">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar-title>

      <slot name="toolBarItem" :selectedItems="selected" :allitems="apiData[modelName]"></slot>

      <v-spacer></v-spacer>
      <slot name="toolBarSearch">
        <v-text-field class="pr-2" v-if="searchable && !serverPagination" v-model="search" label="Search" append-icon="search" single-line hide-details></v-text-field>
      </slot>
      <v-file-btn class="mr-1" v-permission="createPermission" color="primary" @fileSelected="onImportData" :loading="isImporting" v-if="importable && insertable">Import CSV</v-file-btn>&nbsp;
      <v-btn class="mr-1" color="primary" @click="onExportData" :loading="isExporting" v-if="exportable">Export CSV</v-btn>&nbsp; 
      <v-form-dialog v-model="formDialog" :max-width="dialogWidth" :max-height="dialogHeight" :fullscreen="dialogFullscreen"
        :form-title="title" :object="currentObject" :initialData="initialData"
        @create="onCreateData" @update="onUpdateData"
        :hide-insert-button="!computedInsertable || hideInsertButton || !$permission(createPermission)"
        v-if="insertable"
        ref="modelFormDialog"
      >
        <template v-slot="{data,rules,isCreating,isDataChange}">
          <slot name="modelForm" :data="data" :rules="rules" :isCreating="isCreating" :isDataChange="isDataChange"></slot>
        </template>
      </v-form-dialog>
      <slot name="toolBarButton" :onCreateData="onCreateData" :onUpdateData="onUpdateData"></slot>
    </v-toolbar>
    <v-card-text>
      <v-data-table
        v-model="selected"
        :items="apiData[modelName]"
        :item-key="modelKey"
        :headers="computedHeaders"
        :page.sync="pagination.page"
        :items-per-page.sync="pagination.perPage"
        :server-items-length="totalItems"
        :footer-props="{
          itemsPerPageOptions: rowsPerPageItems
        }"
        :loading="isLoading"
        :search="search"
        :show-expand="expandable"
        :show-select="showSelect || multipleSelect"
        :single-select="!multipleSelect"
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        :groupBy="groupBy"
        :groupDesc="groupDesc"
        :showGroupBy="showGroupBy"
        @click:row="rowClick"
      >
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" :actions="actions" v-bind="scope" v-if="!(slot in disableAutoSlots)"></slot>
        </template>
        <template v-slot:body.append="scope">
          <slot name="body.append" v-bind="scope" :selectedItems="selected" :allitems="apiData[modelName]"></slot>
        </template>
        <template v-slot:item.action="props" v-if="!('item.action' in $scopedSlots) && !this.readonly">
          <v-icon v-permission="updatePermission" class="mx-1" @click.stop="actions.editData(props.item)" v-if="insertable && !hideToolbar">$vuetify.icons.edit</v-icon>
          <v-icon v-permission="deletePermission" class="mx-1" color="red darken-3" @click.stop="actions.deleteData(props.item)">$vuetify.icons.delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import apiModel from '#/mixins/apiModel'
import {isUndefined,startCase,cloneDeep,indexOf,without} from 'lodash'

export default {
  mixins: [apiModel],
  data: ()=>({
    search: undefined,
    selected: [],
    expanded: [],
    formDialog: false,
    currentObject : {},
    disableAutoSlots : ['modelForm','body.append'],
  }),
  model: {
    prop: 'value',
    event: 'selectItem'
  },
  props: {
    hideToolbar: {
      type: Boolean,
      default: false
    },
    hideInsertButton: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Array,
      default: undefined
    },
    searchable: {
      type: Boolean,
      default: false
    },
    importable: {
      type: Boolean,
      default: false
    },
    exportable: {
      type: Boolean,
      default: false
    },
    insertable: {
      type: Boolean,
      default: true
    },
    defaultItemsPerPage: {
      type: [String,Number],
      default: 10
    },
    limitTotalItems: {
      type: Number,
      default: undefined
    },
    expandable: {
      type: Boolean,
      default: false
    },
    singleExpand: {
      type: Boolean,
      default: false
    },
    refreshable: {
      type: Boolean,
      default: true
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
    autoItemAction: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    keyword: {
      type: String,
      default: undefined
    },
    groupBy: {
      type: [String,Array],
      default: ()=>[]
    },
    groupDesc: {
      type: [Boolean,Array],
      default: ()=>[]
    },
    showGroupBy: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: ()=>[]
    },
    createPermission: {
      type: String,
      default: undefined
    },
    updatePermission: {
      type: String,
      default: undefined
    },
    deletePermission: {
      type: String,
      default: undefined
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      if (this.modelTitle !== null) return this.modelTitle
      else return startCase(this.modelName)
    },
    actions() {
      return {
        editData: this.editData,
        deleteData: this.deleteData,
        refreshData: this.refreshData,
        saveData: this.saveData,
        reload: this.loadData,
        expand: this.expand,
      }
    },
    computedHeaders() {
      let headers = cloneDeep(this.headers)
      if (this.autoItemAction && !this.readonly) headers.push({text: 'Action',value: 'action',sortable: false})
      return headers
    },
    computedInsertable() {
      if (this.insertable && !this.readonly) {
        if (isUndefined(this.limitTotalItems)) return true
        else {
          if (isUndefined(this.totalItems)) {
            return isUndefined(this.apiData[this.modelName]) || this.apiData[this.modelName].length<this.limitTotalItems 
          } else {
            return this.totalItems < this.limitTotalItems
          }
        }
      } else {
        return false
      }
    }
  },
  methods: {
    newData(object) {
      this.$refs.modelFormDialog.isCreating = true
      this.$nextTick(()=>{
        this.formDialog = true
        this.$nextTick(()=>{
          this.$nextTick(()=>{
            this.$nextTick(()=>{
              this.$refs.modelFormDialog.fillData(object)
            })
          })
        })
      })
    },
    rowClick(row) {
      if (!this.multipleSelect) {
        if (indexOf(this.selected,row) != -1) this.selected = []
        else this.selected = [row]
      } else {
        if (indexOf(this.selected,row) != -1) this.selected = without(this.selected,row)
        else this.selected.push(row)
      }
    },
    expand(row) {
      if (this.singleExpand) {
        if (indexOf(this.expanded,row) != -1) this.expanded = []
        else this.expanded = [row]
      } else {
        if (indexOf(this.expanded,row) != -1) this.expanded = without(this.expanded,row)
        else this.expanded.push(row)
      }
    },
    editData(object) {
      this.currentObject = object
      this.$nextTick(()=>{
        this.formDialog = true
      })
    },
    saveData(object,callback=undefined) {
      this.onUpdateData(object,callback)
    },
  },
  watch: {
    selected: function(newVal) {
      this.$emit('selectItem',newVal)
    },
    keyword: function(newVal) {
      this.search = newVal
    },
    value: {
      handler(newVal) {
        this.selected = newVal
      },
      deep: true
    }
  },
  mounted() {
    this.$set(this.pagination,'perPage',Number(this.defaultItemsPerPage))
    this.selected = this.value
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
