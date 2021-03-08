<template>
  <v-card flat>
    <v-card-text align="center">
      <template v-if="hasMediaStream">
        <video autoplay ref="videoScreen" width="100%" style="maxWidth:1024px"></video>
      </template>
      <template v-else>
        <v-btn @click="startMediaCapture" large>
          <v-icon>photo_camera</v-icon> Take Photo
          <form ref="fileForm">
            <input ref="fileInput" type="file" accept="image/*" capture="camera" v-on:change="scanImageFile" style="display:none"/>
          </form>
        </v-btn>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
import { BrowserMultiFormatReader } from "@zxing/library";

export default {
  data: ()=>({
    isCameraStart: false,
    codeReader: new BrowserMultiFormatReader(),
  }),
  props: {
    continuous: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    stopCamera: function() {
      this.isCameraStart = false
      this.codeReader.reset()
    },
    startCamera: function() {
      this.isCameraStart = true
      this.codeReader.decodeFromVideoDevice(
        undefined,
        this.$refs.videoScreen,
        (result) => {
          if (result) {
              this.$emit("decode", result.text);
              if (!this.continuous) this.stopCamera()
          }
        }
      )
    },
    startMediaCapture: function() {
      this.$refs.fileForm.reset()
      this.$refs.fileInput.click()
    },
    scanImageFile: function(e) {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.codeReader
        .decodeFromImage(undefined,e.target.result)
        .then(result => this.$emit("decode", result.text))
        .catch(e => void e)
        .finally(()=>{
          this.codeReader.reset()
        })
      }
      reader.readAsDataURL(e.target.files[0])
    },
    reset() {
      this.stopCamera()
      this.codeReader.reset()
      this.startCamera()
    }
  },
  computed: {
    hasMediaStream() {
      return !!(navigator && navigator.mediaDevices && "enumerateDevices" in navigator.mediaDevices)
    },
    hasMediaCapture() {
      let el = document.createElement('input')
      return el.capture != undefined
    },
  },
  mounted() {
    if (this.hasMediaStream) this.startCamera()
  },
  beforeDestroy() {
    if (this.hasMediaStream) this.stopCamera()
    this.codeReader.reset()
  },
}
</script>

<style lang="css" scoped>
</style>
