<template>
  <span>
    <label class="font-weight-bold" v-if="label">{{ label }} : </label>
    <label class="value-slot" :class="colorClass">
      <slot></slot>
    </label>
    <label v-if="append"> {{ append }}</label>
  </span>
</template>

<script>
import { isUndefined,isArray } from 'lodash'

export default {
  data: ()=>({
    contentData: null
  }),
  props: {
    minimum: {
      type: [String, Number],
      default: null
    },
    maximum: {
      type: [String, Number],
      default: null
    },
    normal: {
      type: [String, Array],
      default: null
    },
    normalColor: {
      type: String,
      default: undefined
    },
    abnormalColor: {
      type: String,
      default: 'red'
    },
    label: {
      type: String,
      default: null
    },
    append: {
      type: String,
      default: null
    },
  },
  computed: {
    colorClass() {
      if (isNaN(this.contentData)) {
        if (this.normal && this.normalValue.indexOf(this.contentData)==-1) {
          return this.abnormalColor+'--text font-weight-bold'
        }
      } else {
        if ((this.minValue && (Number(this.contentData) < Number(this.minValue))) || (this.maxValue && (Number(this.contentData) > Number(this.maxValue))) || (this.normal && (this.normalValue.indexOf(this.contentData)==-1))) {
          return this.abnormalColor+'--text font-weight-bold'
        }
      }
      return (isUndefined(this.normalColor)) ? "" : this.normalColor+'--text'
    },
    minValue() {
      return (isNaN(this.minimum)) ? null : this.minimum
    },
    maxValue() {
      return (isNaN(this.maximum)) ? null : this.maximum
    },
    normalValue() {
      return (isArray(this.normal)) ? this.normal : [this.normal]
    }
  },
  mounted() {
    this.contentData = this.$el.getElementsByClassName("value-slot")[0].innerHTML
  },
  updated() {
    this.contentData = this.$el.getElementsByClassName("value-slot")[0].innerHTML
  }
}
</script>

<style lang="css" scoped>
</style>
