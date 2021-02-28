<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row class="ma-0 pa-0">
      <v-col class="ma-0 pa-0">
        <v-list class="picker-list">
          <v-list-item-title>Hour</v-list-item-title>
          <v-list-item-group v-model="hour" color="primary">
            <v-list-item
              v-for="i in 24"
              :key="i"
              dense
            >
              <v-list-item-content>
                <v-list-item-title>{{ String(i-1).padStart(2,'0') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col class="ma-0 pa-0">
        <v-list class="picker-list">
          <v-list-item-title>Min</v-list-item-title>
          <v-list-item-group v-model="minute" color="primary">
            <v-list-item
              v-for="i in 60"
              :key="i"
              dense
            >
              <v-list-item-content>
                <v-list-item-title>{{ String(i-1).padStart(2,'0') }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isUndefined } from 'lodash'
import * as helperDateTime from '@/lib/helperDateTime'

export default {
  data: ()=>({
    hour: undefined,
    minute: undefined,
  }),
  props: {
    value: {
      type: String,
      default: undefined
    }
  },
  watch: {
    value: function(newValue) {
      this.setTime()
    },
    hour: function(newValue) {
      this.emitValue()
    },
    minute: function(newValue) {
      this.emitValue()
    }
  },
  methods: {
    emitValue() {
      if (!isUndefined(this.hour) && !isUndefined(this.minute)) {
        let time = String(this.hour).padStart(2,'0') + ':' + String(this.minute).padStart(2,'0')
        this.$emit('input',time)
        this.$emit('change',time)
      }
    },
    setTime() {
      if (!helperDateTime.isValidTime(this.value))  {
        this.hour = undefined
        this.minute = undefined
      } else {
        let time = helperDateTime.parseTime(this.value)
        this.hour = time.hour()
        this.minute = time.minute()
      }
    }
  },
  mounted() {
    this.setTime()
  },
}
</script>

<style lang="css" scoped>
.picker-list {
  overflow-y: auto;
  max-height: 150px;
}
</style>
