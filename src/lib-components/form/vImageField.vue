<template>
  <v-form-pad v-model="imageData" v-if="!isAssetData">
    <template v-slot="{data, rules}">
      <v-image-capture v-model="data.base64string" :max-width="maxWidth" :max-height="maxHeight" v-bind:value="value" v-bind="$attrs" v-on="$listeners"></v-image-capture>
    </template>
  </v-form-pad>
  <v-card v-else>
    <v-card-text align="center">
      <v-asset-viewer :asset="viewerImageData" :max-width="maxWidth" :max-height="maxHeight"></v-asset-viewer>
    </v-card-text>
    <v-card-actions v-if="!readonly">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="reset" :disabled="disabled">Reset</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import {isObject,isInteger} from 'lodash'

export default {
  data: ()=>({
    imageData: null,
  }),
  props: {
    value: {
      type: [Object,Array,Number],
      default: ()=>({})
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [String,Number],
      default: undefined,
    },
    maxWidth: {
      type: [String,Number],
      default: 1024,
    },
  },
  watch: {
    imageData: {
      handler(newValue) {
        this.$emit('input',newValue)
      },
      deep: true
    },
    value: {
      handler(newValue) {
        this.imageData = newValue
      },
      deep: true,
      immediate: true,
    }
  },
  computed: {
    isAssetData() {
      if (isObject(this.imageData) && this.imageData.id) {
        return true
      } else if (isInteger(this.imageData)) {
        return true
      } else {
        return false
      }
    },
    viewerImageData() {
      if (isInteger(this.imageData)) {
        return {id: this.imageData}
      } else {
        return this.imageData
      }
    }
  },
  methods: {
    reset() {
      this.imageData = {}
    }
  }
}
</script>

<style lang="css" scoped>
</style>
