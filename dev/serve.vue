<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TanteeCommonSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  TanteeCommonSample,
  // }
});
</script>

<template>
  <div id="app">
    <v-code-editor></v-code-editor>
  </div>
</template>
