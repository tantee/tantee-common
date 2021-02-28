<template>
  <v-dialog v-model="isShowing" :max-width="maxWidth" scrollable persistent @keydown.esc="closeDialog" :fullscreen="fullscreen">
    <template v-slot:activator="{ on }" v-if="!hideActivateButton">
      <slot name="activateButton" :on="on" :disabled="disabled"><v-btn color="primary" v-on="on" :disabled="disabled">{{ ActivateButtonText }}</v-btn></slot>
    </template>
    <v-card>
      <v-card-title primary-title class="headline" v-if="!hideTitle">
        <slot name="title">{{ formTitle }}</slot>
      </v-card-title>
      <v-card-text :max-height="maxHeight" :class="(hideTitle)? 'pa-0' : undefined">
        <slot name="content"></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDialog">{{ closeCaption }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data: ()=>({
    isShowing: false,
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
    isShowDialog: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    closeCaption: {
      type: String,
      default: 'Close'
    },
    hideActivateButton: {
      type: Boolean,
      default: false
    },
    hideTitle: {
      type: Boolean,
      default: false
    },
    ActivateButtonText: {
      type: String,
      default: "New",
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    closeDialog() {
      this.isShowing = false
    },
    showDialog() {
      this.isShowing = true
    }
  },
  watch: {
    isShowDialog: function(newVal) {
      this.isShowing = newVal
    },
    isShowing: function(newVal) {
      this.$emit('showingChange',newVal)
    },
  },
  mounted() {
    this.isShowing = this.isShowDialog
  },
}
</script>

<style lang="css" scoped>
</style>
