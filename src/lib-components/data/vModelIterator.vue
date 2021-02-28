<template lang="html">
  <v-card :flat="flat">
    <v-toolbar v-if="!hideToolbar" flat>
      <v-toolbar-title>
        {{ title }}
        <v-btn text icon color="grey lighten-1" @click="loadData" v-if="refreshable">
          <v-icon>refresh</v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-toolbar-items>
        <slot name="toolBarItem"></slot>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-text-field class="pr-2" v-if="searchable" v-model="search" label="Search" append-icon="search" single-line hide-details></v-text-field>
      <v-file-btn color="primary" @fileSelected="onImportData" :loading="isImporting" v-if="importable">Import CSV</v-file-btn>&nbsp;
      <v-form-dialog v-model="formDialog" :max-width="dialogWidth" :max-height="dialogHeight" :fullscreen="dialogFullscreen"
        :form-title="title" :object="currentObject" :initialData="initialData"
        @create="onCreateData" @update="onUpdateData"
        :insertable="computedInsertable"
        v-if="insertable"
        ref="modelFormDialog"
      >
        <template v-slot="{data,rules,isCreating}">
          <slot name="modelForm" :data="data" :rules="rules" :isCreating="isCreating"></slot>
        </template>
      </v-form-dialog>
      <slot name="toolBarButton" :onCreateData="onCreateData" :onUpdateData="onCreateData"></slot>
    </v-toolbar>
    <v-card-text>
      <v-data-iterator
        v-model="selected"
        :items="apiData[modelName]"
        :item-key="modelKey"
        :page.sync="pagination.page"
        :items-per-page.sync="pagination.perPage"
        :server-items-length="totalItems"
        :loading="isLoading"
        :footer-props="{
          itemsPerPageOptions: rowsPerPageItems
        }"
        :search="search"
        :single-select="!multipleSelect"
      >
        <template v-slot:default="props">
          <v-row>
            <v-col v-for="item in props.items" :key="item[modelKey]" :cols="column">
              <slot name="item" :actions="actions" :item="item"></slot>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script>
import apiModel from '@/mixins/apiModel'
import {isUndefined,startCase,indexOf,pull} from 'lodash'

export default {
  mixins: [apiModel],
  data: ()=>({
    selected: [],
    currentObject : {},
    formDialog: false,
    search: undefined,
  }),
  model: {
    prop: 'selected',
    event: 'selectItem'
  },
  props: {
    hideToolbar: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
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
    column: {
      type: Number,
      default: 12
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
      }
    },
    computedInsertable() {
      if (this.insertable) {
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
            this.$refs.modelFormDialog.fillData(object)
          })
        })
      })
    },
    editData(object) {
      this.currentObject = object
      this.$nextTick(()=>{
        this.formDialog = true
      })
    },
    rowClick(row) {
      if (!this.multipleSelect) {
        if (indexOf(this.selected,row) != -1) this.selected = []
        else this.selected = [row]
      } else {
        if (indexOf(this.selected,row) != -1) pull(this.selected,row)
        else this.selected.push(row)
      }
    },
    saveData(object) {
      this.onUpdateData(object)
    },
  },
  watch: {
    selected: function(newVal) {
      this.$emit('selectItem',newVal)
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
