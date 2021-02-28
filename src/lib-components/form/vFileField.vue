<template>
  <v-btn @click="openDialog" v-if="!isFileLoaded">
    <slot>Upload</slot>
    <form ref="fileForm">
      <input ref="fileInput" type="file" v-on:change="fileSelected" style="display:none" :accept="accept">
    </form>
  </v-btn>
  <v-chip v-model="isChipOpen" close @click:close="reset" v-else>{{ currentFileName }}</v-chip>
</template>

<script>
  import { isPlainObject,isUndefined } from 'lodash'
  export default {
    data: ()=>({
      currentFileName: null,
      currentFileData: undefined,
      isFileLoaded: false,
      isChipOpen: true,
    }),
    props: {
      accept: {
        type: String,
        default: undefined
      },
      value: {
        type: [Object, String],
        default: undefined
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      reset() {
        this.currentFileName = null
        this.currentFileData = undefined
        this.isFileLoaded = false
        this.isChipOpen = true
      },
      validate() {
        return !this.required || this.isFileLoaded
      },
      fileSelected(e) {
        if (e.target.files) {
          this.currentFileName = e.target.files[0].name

          var reader = new FileReader()
          reader.onload = () => {
            this.currentFileData = {
              base64string: reader.result,
              filename: e.target.files[0].name
            }
            this.isFileLoaded = true
          }
          reader.readAsDataURL(e.target.files[0])
        }
      },
      openDialog() {
        this.$refs.fileForm.reset()
        this.$refs.fileInput.click()
      },
      loadData() {
        if (isPlainObject(this.value)) {
          if (!isUndefined(this.value['base64string'])) {
            this.currentFileData = this.value
            this.currentFileName = (!isUndefined(this.value['filename'])) ? this.value['filename'] : '[base64data]'
            this.isFileLoaded = true
          } else {
            this.reset()
          }
        } else {
          if (!isUndefined(this.value) && this.value!=null) {
            this.currentFileName = this.value
            this.currentFileData = this.value
            this.isFileLoaded = true
          } else {
            this.reset()
          }
        }
      }
    },
    watch: {
      currentFileData: {
        handler(newVal) {
          this.$emit("input",newVal)
        },
        deep: true
      },
      value: {
        handler(newVal) {
          this.loadData()
        },
        deep: true
      },
      isChipOpen: function(newVal) {
        if (!newVal) {
          this.reset()
        }
      },
    },
    mounted() {
      this.loadData()
    }
  }
</script>

<style lang="css">
</style>
