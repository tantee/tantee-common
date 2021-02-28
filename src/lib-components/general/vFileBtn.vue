<template>
  <v-btn v-bind="$attrs" v-on="$listeners" @click="openDialog">
    <slot>Import</slot>
    <form ref="fileForm">
      <input ref="fileInput" type="file" v-on:change="fileSelected" style="display:none" :multiple="multiple" :accept="accept">
    </form>
  </v-btn>
</template>

<script>
  export default {
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      accept: {
        type: String,
        default: undefined
      }
    },
    methods: {
      fileSelected(e) {
        if (e.target.files) this.$emit('fileSelected',e.target.files)
      },
      openDialog() {
        this.$refs.fileForm.reset()
        this.$refs.fileInput.click()
      }
    }
  }
</script>

<style lang="css">
</style>
