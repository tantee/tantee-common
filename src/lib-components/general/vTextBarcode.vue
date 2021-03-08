<template>
  <v-text-field v-model="currentValue" v-bind:value="value" v-bind="$attrs" v-on="$listeners" append-icon="mdi-qrcode-scan" @click:append="scanCode">
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope"></slot>
    </template>
  </v-text-field>
</template>

<script>
import vBarcodeReader from '@/lib-components/general/vBarcodeReader.vue'

export default {
  components: {
    vBarcodeReader
  },
  data: ()=>({
    currentValue: undefined
  }),
  props: {
    value: {
      default: undefined
    },
  },
  watch: {
    value: function(newValue) {
      this.currentValue = newValue
    },
  },
  methods: {
    scanCode() {
      this.$barcode().then(([result,decode])=>{
        if (decode) {
          this.currentValue = result
          this.$emit('input',result)
          this.$emit('decode',result)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
