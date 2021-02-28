<template>
  <v-dialog v-model="isShowing" :max-width="maxWidth" scrollable persistent @keydown.esc="closeDialog" :fullscreen="fullscreen">
    <template v-slot:activator="{ on }" v-if="!hideActivateButton">
      <slot name="activateButton" :on="on" :disabled="disabled"><v-btn color="primary" v-on="on" :disabled="disabled">{{ ActivateButtonText }}</v-btn></slot>
    </template>
    <v-card>
      <v-card-title primary-title class="headline">
        <slot name="title">{{ formTitle }}</slot>
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
        <v-form-pad v-model="formData" ref="formPad">
          <template v-slot="{data, rules}">
            <slot :data="data" :rules="rules"></slot>
          </template>
        </v-form-pad>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :loading="isSaving" :disabled="checkDataChange && !isDataChange" @click="onSaveData">{{ saveCaption }}</v-btn>
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
    hideActivateButton: {
      type: Boolean,
      default: false
    },
    ActivateButtonText: {
      type: String,
      default: "New",
    },
    checkDataChange: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onSaveData() {
      this.isSaving = true
      this.formErrors = []

      if (this.$refs.formPad.validate()) {
        this.$emit('saveData',this.formData,{ form: this,done: function() {
          this.form.isSaving = false
          this.form.closeDialog()
        },error: function(errors){
          this.form.isSaving = false
          this.form.formErrors = errors
        }})
      } else {
        this.isSaving = false
      }
    },
    onOpening() {
      if (this.$refs.formPad) this.$refs.formPad.reset()
      this.formData = {}
      this.formErrors = []

      this.$nextTick(()=>{
        this.formData = cloneDeep(this.object)
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
    isShowing: function(newVal) {
      this.$emit('showingChange',newVal)
      this.onOpening()
    },
    object: {
      handler() {
        this.formData = cloneDeep(this.object)
      },
      deep: true
    },
  },
  mounted() {
    this.isShowing = this.isShowDialog
  },
  computed: {
    isDataChange : function () {
      return !isEqual(this.formData,this.object)
    }
  }
}
</script>

<style lang="css">
</style>
