<template>
  <v-snackbar
    v-model="isShowing"
    :top="top"
    :left="left"
    :right="right"
    :bottom="bottom"
    :timeout="timeout"
    :color="alertColor[currentAlert.alertType] || currentAlert.alertType"
    multi-line
    style="opacity:0.9"
  >
    {{ currentAlert.alertText }}
    <v-btn dark text @click="isShowing = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { take } from 'lodash'

export default {
  data: () => ({
    isShowing: false,
    currentAlert: {},
    alertColor: {
      info: "grey darken-4",
      warning: "deep-orange lighten-2"
    }
  }),
  computed: {
    hasAlertPending() {
      return Boolean(this.$store.getters.getAlertCountByLocation(this.location))
    },
    getAlert: function() {
      return take(this.$store.getters.getAlertByLocation(this.location),1)
    }
  },
  props: {
    location: {
      default: "top",
      type: String
    },
    top: {
      default: false,
      type: Boolean
    },
    left: {
      default: false,
      type: Boolean
    },
    right: {
      default: false,
      type: Boolean
    },
    bottom: {
      default: false,
      type: Boolean
    },
    timeout: {
      default: 6000,
      type: Number
    }
  },
  methods: {
    renewAlert() {
      if (this.hasAlertPending && !this.isShowing) {
        this.currentAlert = this.getAlert[0]
        this.$nextTick(() => {
          this.isShowing = true
        })
      }
    },
    registerLocation() {
      this.$store.commit('registerLocation',this.location)
    }
  },
  watch: {
    hasAlertPending: function(newValue) {
      if (newValue) this.renewAlert()
    },
    isShowing: function(newValue,oldValue) {
      if (!newValue && oldValue) {
        this.$store.commit('removeAlertItem',this.currentAlert)
        this.$nextTick(() => {
          this.renewAlert()
        })
      }
    },
    location: function() {
      this.registerLocation()
    }
  },
  mounted() {
    this.registerLocation()
  }
}
</script>

<style lang="css">
</style>
