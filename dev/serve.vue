<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TanteeCommonSample } from '@/entry.esm';
import vTextBarcode from '@/lib-components/general/vTextBarcode.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
   vTextBarcode,
  },
  data: ()=>({
    test: undefined
  })
});
</script>

<template>
  <div id="app">
    <v-app>
      <v-text-barcode v-model="test"></v-text-barcode>
      {{test}}
    </v-app>
  </div>
</template>
