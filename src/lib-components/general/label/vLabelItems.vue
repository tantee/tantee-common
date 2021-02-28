<template>
  <label>
    {{ apiDataText }}
  </label>
</template>

<script>
import { isUndefined,find } from 'lodash'

export default {
  props: {
    items: {
      type: Array,
      default: undefined
    },
    itemKey: {
      type: [String, Array],
      default: 'id'
    },
    itemValue: {
      type: String,
      default: undefined
    },
    value: {
      default: undefined
    }
  },
  asyncComputed: {
    apiDataText() {
      return new Promise((resolve)=>{
        try {
          let returnItem = find(this.items,(o)=>{
            return o[this.itemKey] == this.value
          })
          if (!isUndefined(returnItem)) resolve(returnItem[this.itemValue])
        } catch(e) {
          void e
        } finally {
          resolve(this.value)
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
