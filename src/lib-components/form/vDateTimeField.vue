<template>
  <v-container fluid pa-0>
    <v-row :dense="dense">
      <v-col cols="8">
        <v-date-field v-model="datePart" :rules="combinedRules" :label="label" :disabled="disabled || fixedDate" :readonly="readonly"></v-date-field>
      </v-col>
      <v-col cols="4" class="pl-2">
        <v-time-field v-model="timePart" :rules="combinedRules" label="เวลา" :disabled="disabled" :readonly="readonly"></v-time-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import helperDateTime from '#/helperDateTime'
import { isNil,isBoolean,castArray,isString } from 'lodash'

export default {
  data: ()=>({
    datePart: null,
    timePart: null,
    pauseEmit: false,
  }),
  props: {
    value: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'วันที่-เวลา'
    },
    defaultDate: {
      type: [String, Boolean],
      default: false
    },
    defaultDateTime: {
      type: [String, Boolean],
      default: false
    },
    fixedDate: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: ()=>([])
    },
    onlyFuture: {
      type: [Boolean, String],
      default: false
    },
    onlyHappen: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    datePart: function() {
      if (!this.pauseEmit) this.emitDateTime()
    },
    timePart: function() {
      if (!this.pauseEmit) this.emitDateTime()
    },
    value: function() {
      this.setDateTime()
    },
  },
  computed: {
    combinedRules() {
      let tmpRules = (this.rules) ? castArray(this.rules) : []
      if (this.onlyFuture) {
        tmpRules.push(this.onlyFutureRule())
      }
      if (this.onlyHappen) {
        tmpRules.push(this.onlyHappenRule())
      }
      return tmpRules
    }
  },
  methods: {
    emitDateTime() {
      if (this.datePart) {
        let tmpDateTime = (this.timePart) ? this.datePart+' '+this.timePart : this.datePart
        this.$emit('input',tmpDateTime)
      } else {
        this.$emit('input',null)
      }
    },
    setDateTime() {    
      if (this.value) {
        let tempDateTime = helperDateTime.parseDateTime(this.value)
        if (tempDateTime !== null) {
          this.datePart = tempDateTime.format('YYYY-MM-DD')
          if (this.value != tempDateTime.format('YYYY-MM-DD')) this.timePart = tempDateTime.format('HH:mm:ss')
        } else {
          this.reset()
        }
      } else {
        this.reset()
      }
    },
    setDefaultDate() {
      if (this.defaultDate && !this.defaultDateTime && isNil(this.value)) {
        let tempDateTime = null
        if (isBoolean(this.defaultDate)) tempDateTime = helperDateTime.today()
        else tempDateTime = helperDateTime.parseDateTime(this.defaultDate)

        if (tempDateTime !== null) {
          this.datePart = tempDateTime.format('YYYY-MM-DD')
          this.$forceUpdate()
        }
      }
    },
    setDefaultDateTime() {
      if (this.defaultDateTime && isNil(this.value)) {
        let tempDateTime = null
        if (isBoolean(this.defaultDateTime)) tempDateTime = helperDateTime.now()
        else tempDateTime = helperDateTime.parseDateTime(this.defaultDateTime)

        if (tempDateTime !== null) {
          this.pauseEmit = true
          this.datePart = tempDateTime.format('YYYY-MM-DD')
          this.pauseEmit = false
          this.timePart = tempDateTime.format('HH:mm:ss')
          this.$forceUpdate()
        }
      }
    },
    reset() {
      this.datePart = null
      this.timePart = null
      this.$nextTick(()=>{
        this.setDefaultDate()
        this.setDefaultDateTime()
      })
    },
    onlyFutureRule() {
      return v=> (!v || !this.value || helperDateTime.parseDateTime(this.value).isAfter(helperDateTime.today())) || ((!isString(this.onlyFuture)) ? 'Date should be after today' : this.onlyFuture)
    },
    onlyHappenRule() {
      return v=> (!v || !this.value || helperDateTime.parseDateTime(this.value).isSameOrBefore(helperDateTime.today())) || ((!isString(this.onlyHappen)) ? 'Date should be already happened' : this.onlyHappen)
    },
  },
  mounted() {
    this.$nextTick(()=>{
      this.setDateTime()
    })
  }
}
</script>

<style lang="css" scoped>
</style>
