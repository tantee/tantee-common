<template>
  <v-card :flat="flat">
    <v-tabs v-model="currentTab">
      <slot name="tabs"></slot>
    </v-tabs>
    <v-card>
      <v-tabs-items v-model="currentTab">
        <slot name="items"></slot>
      </v-tabs-items>
    </v-card>
  </v-card>
</template>

<script>
export default {
  data: ()=>({
    currentTab: undefined,
  }),
  props: {
    flat: {
      type: Boolean,
      default: true
    },
  }
}
</script>

<style lang="css" scoped>
</style>
