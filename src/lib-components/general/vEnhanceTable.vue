<template>
  <v-data-table
    v-model="selected"
    v-bind:value="value" v-bind="$attrs" v-on="$listeners"
    :single-select="singleSelect"
    :items="items"
    @click:row="rowClick"
  >
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" v-if="!(slot in disableAutoSlots)"></slot>
    </template>
    <template v-slot:body.append="scope">
      <slot name="body.append" v-bind="scope" :selectedItems="selected" :allitems="items"></slot>
    </template>
  </v-data-table>
</template>

<script>
import {indexOf,without,intersectionWith,isEqual} from 'lodash'

export default {
  data: ()=>({
    selected: [],
    disableAutoSlots : ['body.append'],
  }),
  props: {
    singleSelect: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: ()=>[]
    },
    value: {
      type: Array,
      default: ()=>[]
    }
  },
  methods: {
    rowClick(row) {
      if (this.singleSelect) {
        if (indexOf(this.selected,row) != -1) this.selected = []
        else this.selected = [row]
      } else {
        if (indexOf(this.selected,row) != -1) this.selected = without(this.selected,row)
        else this.selected.push(row)
      }
    },
  },
  watch: {
    items: {
      handler(newVal) {
        this.selected = intersectionWith(newVal,this.selected,isEqual)
      },
      deep: true
    }
  }
}
</script>

<style lang="css">
</style>
