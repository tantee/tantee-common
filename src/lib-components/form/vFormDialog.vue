<template>
  <v-dialog v-model="isShowing" :max-width="maxWidth" scrollable persistent @keydown.esc="closeDialog" :fullscreen="fullscreen">
    <template v-slot:activator="{ on }" v-if="!hideInsertButton">
      <v-btn color="primary" v-on="on" @click.capture="isCreating = true"><v-icon>add</v-icon></v-btn>
    </template>
    <v-card>
      <v-card-title primary-title class="headline">
        <slot name="title">{{ (isCreating) ? "New" : "Edit" }} "{{ formTitle }}"</slot>
      </v-card-title>
      <v-card-text :max-height="maxHeight">
        <slot :errors="formErrors" name="formError">
          <v-card v-if="formErrors && formErrors.length">
            <v-card-text class="grey lighten-4">
              <ul class="red--text text--darken-1">
                <li v-for="(error,index) in formErrors" :key="index">{{ (error.errorText) ? error.errorText : error }}</li>
              </ul>
            </v-card-text>
          </v-card>
        </slot>
        <v-form-pad v-model="formData" ref="formPad" no-parent-validate>
          <template v-slot="{data, rules}">
            <slot :data="data" :rules="rules" :isCreating="isCreating" :isDataChange="isDataChange"></slot>
          </template>
        </v-form-pad>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :loading="isSaving" :disabled="!isDataChange" @click="onSaveData">{{ saveCaption }}</v-btn>
        <v-btn color="primary lighten-1" :disabled="isSaving" @click="closeDialog">{{ cancelCaption }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { isEqual,cloneDeep,assign } from 'lodash'

export default {
  data: ()=>({
    formData: {},
    formErrors: [],
    isShowing: false,
    isSaving: false,
    isCreating: true,
  }),
  model: {
    prop: 'isShowDialog',
    event: 'showingChange'
  },
  props: {
    maxWidth: {
      type: String,
      default: "80vw"
    },
    maxHeight: {
      type: String,
      default: "80vh"
    },
    formTitle: {
      type: String,
      default: null
    },
    object: Object,
    isShowDialog: {
      type: Boolean,
      default: false
    },
    initialData: {
      type: Object,
      default: undefined
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    saveCaption: {
      type: String,
      default: 'Save'
    },
    cancelCaption: {
      type: String,
      default: 'Cancel'
    },
    hideInsertButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onSaveData() {
      this.isSaving = true
      this.formErrors = []


      if (this.$refs.formPad.validate()) {
        this.$nextTick(()=>{
          this.$emit((this.isCreating) ? 'create' : 'update',this.formData,{ form: this,done: function() {
            this.form.isSaving = false
            this.form.closeDialog()
          },error: function(errors){
            this.form.isSaving = false
            this.form.formErrors = errors
          }})
        })
      } else {
        this.isSaving = false
      }
    },
    onClosing() {
      this.isCreating = false
    },
    onOpening() {
      if (this.$refs.formPad) this.$refs.formPad.reset()
      this.$nextTick(()=>{
        this.formData = {}
        this.formErrors = []

        this.$nextTick(()=>{
          if (this.isCreating) this.formData = cloneDeep(this.initialData)
          else this.formData = cloneDeep(this.object)
        })
      })
    },
    closeDialog() {
      if (!this.isSaving) {
        this.isShowing = false
      }
    },
    fillData(item) {
      assign(this.formData,item)
    }
  },
  watch: {
    isShowDialog: function(newVal) {
      this.isShowing = newVal
    },
    isCreating: function(newVal) {
      if (newVal) this.formData = cloneDeep(this.initialData)
    },
    isShowing: function(newVal) {
      this.$emit('showingChange',newVal)
      if (!newVal) this.onClosing()
      else this.onOpening()
    },
    object: {
      handler() {
        this.formData = cloneDeep(this.object)
        this.isCreating = false
      },
      deep: true
    },
  },
  mounted() {
    this.isShowing = this.isShowDialog
  },
  computed: {
    isDataChange : function () {
      return !((this.isCreating) ? isEqual(this.formData,assign({},this.initialData)) : isEqual(this.formData,this.object))
    }
  }
}
</script>

<style lang="css">
</style>
