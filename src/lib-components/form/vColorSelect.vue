<template>
  <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <div :style="swatchStyle" v-on="on" />
    </template>
    <v-card>
      <v-card-text class="pa-0">
        <v-color-picker v-model="color" flat />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data: ()=>({
    color: '#222222',
    menu: false
  }),
  props: {
    width: {
      type: String,
      default: "30px"
    },
    height: {
      type: String,
      default: "30px"
    },
  },
  computed: {
    swatchStyle() {
      const { color, menu } = this
      return {
        backgroundColor: color,
        cursor: 'pointer',
        height: this.height,
        width: this.width,
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out'
      }
    }
  },
  watch: {
    value(newVal) {
      this.color = newVal || "#222222"
    },
    color(newVal) {
      this.$emit('input',newVal)
    }
  },
}
</script>

<style lang="css" scoped>
</style>
