<template>
  <v-dialog @input="close" value="true" :fullscreen="fullscreen" @keydown.esc="close">
    <v-card>
      <v-barcode-reader @decode="onDecode"></v-barcode-reader>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: ()=>({
    value: [undefined,false],
  }),
  methods: {
    onDecode(result) {
      this.$emit('result',[result,true])
      this.value = [result,true]
      this.$destroy()
    },
    close() {
      this.$destroy()
    }
  },
  props: {
    fullscreen: {
      type: Boolean,
      default: false
    }
  }
}
</script>
