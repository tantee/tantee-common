<template>
  <canvas ref="signatureCanvas"></canvas>
</template>

<script>
import signature from 'signature_pad'

export default {
  data: ()=>({
    signaturePad: null
  }),
  mounted() {
    this.signaturePad = new signature(this.$refs.signatureCanvas)
  }
}
</script>

<style lang="css">
</style>
