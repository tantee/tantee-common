<template>
  <v-card>
    <v-card-text align="center">
      <template v-if="!isCaptured">
        <template v-if="hasMediaCapture || !hasGetUserMedia || fileOnly">
          <v-btn @click="startMediaCapture" large>
            <v-icon>photo_camera</v-icon> Take Photo
            <form ref="fileForm">
              <input ref="fileInput" type="file" accept="image/*" capture="camera" v-on:change="captureImageFile" style="display:none"/>
            </form>
          </v-btn>
        </template>
        <template v-else>
          <canvas ref="captureCanvas" style="display:none"></canvas>
          <video autoplay ref="videoScreen" width="100%" style="maxWidth:1024px"></video>
        </template>
      </template>
      <template v-else>
        <v-img :src="imageSrc" max-width="1024" contain></v-img><br />
      </template>
    </v-card-text>
    <v-card-text v-if="showRequiredMessage" class="text-center">
      <span class="red--text">{{ requiredMessage }}</span>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="startCamera" v-if="!isCameraStarted && !(hasMediaCapture || !hasGetUserMedia || fileOnly)">Start</v-btn>
      <v-btn color="primary" @click="captureImage" v-if="isCameraStarted">Capture</v-btn>
      <v-btn color="primary" @click="reset">Reset</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getBase64Strings } from 'exif-rotate-js/lib'

export default {
  data: ()=>({
    isCaptured: false,
    isCameraStarted: false,
    imageData: null,
    showRequiredMessage: false,
  }),
  props: {
    value: {
      default: null
    },
    imageFormat: {
      type: String,
      default: 'image/png'
    },
    autoStart: {
      type: Boolean,
      default: false
    },
    fileOnly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false
    },
    requiredMessage: {
      type: String,
      default: 'This field is required'
    }
  },
  methods: {
    validate() {
      if (!this.required || this.isCaptured) {
        this.showRequiredMessage = false
        return true
      } else {
        this.showRequiredMessage = true
        return false
      }
    },
    captureImage: function() {
      this.$refs.captureCanvas.width = this.$refs.videoScreen.videoWidth
      this.$refs.captureCanvas.height = this.$refs.videoScreen.videoHeight
      this.$refs.captureCanvas.getContext('2d').drawImage(this.$refs.videoScreen,0,0)
      this.imageData = this.$refs.captureCanvas.toDataURL(this.imageFormat)

      this.isCaptured = true
      this.$emit('input',this.imageData)
      this.stopCamera()
    },
    captureImageFile: function(e) {
      if (e.target.files) {
        getBase64Strings(e.target.files, { maxSize: 1024 }).then((returnData)=>{
          this.imageData = returnData[0]
          this.isCaptured = true
          this.$emit('input',this.imageData)
        }).catch((e)=>void e)

        // var reader = new FileReader()
        // reader.onload = () => {
        //   this.imageData = reader.result
        //   this.isCaptured = true
        //   this.$emit('input',this.imageData)
        // }
        // reader.readAsDataURL(e.target.files[0])
      }
    },
    reset: function() {
      this.isCaptured = false
      this.stopCamera()
      if (this.autoStart) this.startCamera()
    },
    stopCamera: function() {
      if (this.$refs.videoScreen) {
        this.$refs.videoScreen.pause()
        let stream = this.$refs.videoScreen.srcObject
        if (stream) {
          let tracks = stream.getTracks();
          tracks.forEach(function(track) {
            track.stop();
          });
        }
        this.$refs.videoScreen.srcObject = null
      }
      this.isCameraStarted = false
    },
    startCamera: function() {
      this.isCaptured = false
      navigator.mediaDevices.getUserMedia({video:{width: {min: 1280}, height: {min: 720}}}).then((stream) => {
        this.$refs.videoScreen.srcObject = stream
        this.isCameraStarted = true
      })
    },
    startMediaCapture: function() {
      this.$refs.fileForm.reset()
      this.$refs.fileInput.click()
    }
  },
  computed: {
    hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    },
    hasMediaCapture() {
      let el = document.createElement('input')
      return el.capture != undefined
    },
    imageSrc() {
      return this.imageData
    }
  },
  mounted() {
    if (!this.isCaptured && this.autoStart) this.startCamera()
  },
  beforeDestroy() {
    this.stopCamera()
  },
  watch: {
    value: function (newValue) {
      this.imageData = newValue
      this.isCaptured = true
      this.stopCamera()
    }
  }
}
</script>

<style lang="css">
</style>
