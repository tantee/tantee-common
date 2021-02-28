<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TanteeCommonSample } from '@/entry.esm';
import * as api from '@/lib/api'
import * as helper from '@/lib/helperDateTime'

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  TanteeCommonSample,
  // }
  mounted() {
    console.log(api)
    console.log(helper)
    console.log(helper.today())
  }
});
</script>

<template>
  <div id="app">
    <v-code-editor></v-code-editor>

    aksdfjasldkfj
  </div>
</template>
