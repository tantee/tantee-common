<template>
  <v-col cols="12" v-if="hasAlert">
    <v-alert class="mb-2" :type="Item.alertType" v-for="(Item,index) in getAlert" :key="index" transition="fade-transition" dismissible prominent dense>
      <b>{{ moment(Item.alertDateTime).format("L LTS") }}</b> {{ Item.alertText }}
    </v-alert>
  </v-col>
</template>

<script>
import { take } from 'lodash'
import moment from 'moment'

export default {
  computed: {
    getAlert: function() {
      return take(this.$store.getters.getAlertByLocation(this.location),this.maxAlert)
    },
    hasAlert: function() {
      return Boolean(this.getAlert.length)
    },
  },
  methods: {
    moment: function (DateTime) {
      return moment(DateTime)
    },
    registerLocation() {
      this.$store.commit('registerLocation',this.location)
    }
  },
  props: {
    location: {
      default: "default",
      type: String
    },
    maxAlert: {
      default: 3,
      type: Number
    }
  },
  watch: {
    location: function(newValue,oldValue) {
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
