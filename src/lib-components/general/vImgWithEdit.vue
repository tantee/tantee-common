<template>
  <div class="overlay-container" @mouseenter="onMouseEnterImg" @mouseleave="onMouseLeaveImg">
    <template v-if="value">
      <div class="overlay-btn" v-if="isMouseHover">
        <v-btn depressed small class="ma-1" @click="editImage"><v-icon>edit</v-icon> Edit</v-btn>
      </div>
      <v-img ref="scanImg" :src="value" v-bind="$attrs" v-on="$listeners"></v-img>
      <v-dialog
        v-model="dialog"
        scrollable
        :max-width="dialogMaxWidth"
        :max-height="dialogMaxHeight"
        transition="dialog-transition"
      >
        <v-card>
          <v-card-title primary-title class="headline">
            Edit image&nbsp;
            <v-btn-toggle v-model="toolbarButton">
              <v-btn>
                <v-icon @click="rotate(-90)">rotate_left</v-icon>
              </v-btn>
              <v-btn>
                <v-icon @click="rotate(90)">rotate_right</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-card-title>
          <v-card-text>
            <vue-cropper :src="value" :view-mode="1" ref="cropper"></vue-cropper>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="saveImage">Save</v-btn>
            <v-btn color="primary lighten-1" @click="dialog=false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  components: { VueCropper },
  data: ()=>({
    dialog: false,
    isMouseHover: false,
    editComponent: undefined,
    toolbarButton: [],
  }),
  props: {
    dialogMaxWidth : {
      type: String,
      default: '80vw'
    },
    dialogMaxHeight: {
      type: String,
      default: '80vh'
    },
    value: {
      type: String,
      default: undefined
    }
  },
  methods: {
    onMouseEnterImg() {
      this.isMouseHover = true
    },
    onMouseLeaveImg() {
      this.isMouseHover = false
    },
    editImage() {
      this.dialog = true
      this.$nextTick(()=>{
        this.editComponent = undefined
        this.$nextTick(()=>{
          this.editComponent = 'VueCropper'
        })
      })
    },
    saveImage() {
      this.$emit('input',this.$refs.cropper.getCroppedCanvas().toDataURL())
      this.dialog = false
    },
    rotate(angle) {
      this.$refs.cropper.rotate(angle)
    },
  }
}
</script>

<style lang="css">
.overlay-container {
  position: relative;
}
.overlay-btn {
  position: absolute !important;
  top: 0;
  left: 0;
  z-index: 100;
}
.cropper-container {
  background-repeat: repeat !important;
}
</style>
