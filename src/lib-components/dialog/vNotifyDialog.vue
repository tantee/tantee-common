<template>
  <v-dialog @input="change" value="true" :max-width="width" @keydown.esc="choose(false)">
    <v-card>
      <v-toolbar v-if="!!title" dark :color="color" dense flat>
        <v-icon v-if="!!icon">{{ icon }}</v-icon>
        <v-toolbar-title class="white--text" v-text="title"/>
      </v-toolbar>
      <v-card-text class="pt-2">{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn :color="buttonColor" text @click="choose(true)">{{ buttonText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: 'Ok'
    },
    buttonColor: {
      type: String,
      default: 'primary'
    },
    color: {
      type: String,
      default: 'warning'
    },
    icon: {
      type: String,
      default: 'warning'
    },
    message: {
      type: String,
      reqiured: true
    },
    title: {
      type: String
    },
    width: {
      type: Number,
      default: 300
    }
  },
  methods: {
    choose (value) {
      this.$emit('result', value)
      this.$destroy()
    },
    change (res) {
      this.$destroy()
    }
  }
}
</script>
