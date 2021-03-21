<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
 //import { TanteeCommonSample } from '@/entry.esm';
import vTextBarcode from '../src/lib-components/general/vTextBarcode.vue';

export default Vue.extend({
  components: { vTextBarcode },
  name: 'ServeDev',
  data: ()=>({
    test: 'adddd'
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
