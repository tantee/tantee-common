<template>
  <label>
    {{ masterDataText }}
  </label>
</template>

<script>
import { isUndefined } from 'lodash'

export default {
  props: {
    groupKey: {
      type: String,
      default: undefined
    },
    itemCode: {
      type: String,
      default: undefined
    },
  },
  asyncComputed: {
    masterDataText() {
      return new Promise((resolve)=>{
        if (!isUndefined(this.groupKey) && !isUndefined(this.itemCode)) {
          this.$store.getters.getItemValue(this.$store.getters.getGroupKey(this.groupKey),this.itemCode).then((result)=>{
            resolve(result)
          }).catch(()=>{
            resolve('')
          })
        } else {
          resolve('')
        }
      })
    }
  },
}
</script>

<style lang="css">
</style>
