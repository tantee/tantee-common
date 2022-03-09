<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
 //import { TanteeCommonSample } from '@/entry.esm';
import vTextBarcode from '../src/lib-components/general/vTextBarcode.vue';
import vColorSelect from '../src/lib-components/form/vColorSelect.vue';
import { mdiPencil,mdiFormatColorFill,mdiEraser } from '@mdi/js';
import Atrament from 'atrament';

export default Vue.extend({
  components: { vTextBarcode,vColorSelect },
  name: 'ServeDev',
  data: ()=>({
    color: '#000000',
    pencilIcon: mdiPencil,
    fillIcon: mdiFormatColorFill,
    eraserIcon: mdiEraser,
    sketchpad: undefined,
    width: '500px',
    height: '400px',
  }),
  methods: {
    iconSvgToCss(svg,size=24) {
      if (svg) {
        return 'url("data:image/svg+xml,%3Csvg version=\'1.1\' id=\'Layer_1\' xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' x=\'0px\' y=\'0px\' width=\''+size+'px\' height=\''+size+'px\' viewBox=\'0 0 '+size+' '+size+'\' style=\'enable-background:new 0 0 '+size+' '+size+';\' xml:space=\'preserve\'%3E %3Cpath d=\''+svg+'\'/%3E %3C/svg%3E"), pointer'
      } else {
        return 'auto' 
      }
    }
  },
  mounted() {
    this.sketchpad = new Atrament(this.$refs.sketchpad);
  },
});
</script>

<template>
  <div id="app">
    <v-app>
      <div :style="{width: width, border: '1px #999999'}">
        <v-toolbar dense round flat outlined>
          <v-color-select></v-color-select>
          <v-btn-toggle
            v-model="toggle_multiple"
            color="primary"
            dense
            group
            multiple
          >
            <v-btn
              :value="1"
              text
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              :value="4"
              text
            >
              <v-icon>mdi-format-color-fill</v-icon>
            </v-btn>
            <v-btn
              :value="2"
              text
            >
              <v-icon>mdi-eraser</v-icon>
            </v-btn>
          </v-btn-toggle>

          <div class="mx-4"></div>

          <v-btn-toggle
            v-model="toggle_exclusive"
            color="primary"
            dense
            group
          >
            <v-btn
              :value="1"
              text
            >
              <v-icon>mdi-circle-small</v-icon>
            </v-btn>

            <v-btn
              :value="2"
              text
            >
              <v-icon>mdi-circle-medium</v-icon>
            </v-btn>

            <v-btn
              :value="3"
              text
            >
              <v-icon>mdi-circle</v-icon>
            </v-btn>
          </v-btn-toggle>

        </v-toolbar>
        <canvas ref="sketchpad" :width="width" :height="height"></canvas>
      </div>
    </v-app>
  </div>
</template>
