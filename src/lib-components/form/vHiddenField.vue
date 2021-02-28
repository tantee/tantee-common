<template>
  <input type="hidden" v-bind:value="value" v-bind="$attrs" v-on="$listeners">
</template>

<script>
import {isUndefined} from 'lodash'
export default {
  props: {
    itemValue: {
      default: undefined
    },
    hook: {
      type: Function,
      default: undefined,
    },
    value: {
      default: undefined
    },
  },
  watch: {
    itemValue: {
      handler() {
        this.emitValue()
      },
      deep: true
    }
  },
  methods: {
    emitValue() {
      let returnValue = this.itemValue

      if (!isUndefined(this.hook)) {
        try {
          Promise.resolve(this.hook(returnValue,this.value)).then((result)=>{
            this.$emit('input',result)
          })
        } catch(e) {
          void e
        }
      } else {
        this.$emit('input',this.itemValue)
      }
    }
  },
  mounted() {
    this.emitValue()
  }
}
</script>

<style lang="css" scoped>
</style>
