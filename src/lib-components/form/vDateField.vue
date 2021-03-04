<template>
  <v-menu ref="menu"
    :close-on-content-click="false"
    v-model="isMenuOpen"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        ref="text"
        v-model="tempDate"
        v-bind="$attrs"
        :readonly="textReadOnly || readonly"
        @focus="onTextFieldFocus"
        @blur="onTextFieldBlur"
        @keydown="onTextFieldTyped"
        @keyup.enter="onTextFieldEnterKey"
        @click:clear="onTextFieldClear"
        v-on="(!readonly) ? on : undefined"
        :rules="combinedRules"
        :class="$vnode.data.staticClass"
      ></v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="date"
      :max="maxDate"
      :min="minDate"
      :locale="$store.getters.getConfig('locale')"
      no-title
      @change="setDatePicker"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
import helperDateTime from '#/helperDateTime'
import { castArray,isString } from 'lodash'

export default {
  data: ()=>({
    date: null,
    tempDate: null,
    isMenuOpen: false,
    isTextFieldFocused: false,
    isTextFieldTyped: false,
  }),
  computed: {
    minDate() {
      return (this.birthDate) ? '1900-01-01' : undefined
    },
    maxDate() {
      return (this.birthDate) ? new Date().toISOString().substr(0, 10) : undefined
    },
    textReadOnly() {
      return this.pickerOnly
    },
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
  watch: {
    isMenuOpen: function(newValue) {
      if (this.birthDate && !this.date) newValue && this.$nextTick(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    date: function(newValue) {
      this.$emit('input',newValue)
    },
    value: function(newValue) {
      this.setDate(newValue)
    },
    isTextFieldFocused: function(newValue) {
      if (newValue) this.tempDate = this.date
      else this.tempDate = helperDateTime.toShortDate(this.date)
    }
  },
  methods: {
    setDatePicker(date) {
      this.setDate(date)
    },
    setDate(DateString) {
      if (!helperDateTime.isValidDate(DateString))  {
        this.tempDate = null
        this.date = null
      } else {
        this.date = helperDateTime.parseDate(DateString).format('YYYY-MM-DD')
        this.tempDate = this.date

        if (!this.isTextFieldFocused) this.tempDate = helperDateTime.toShortDate(this.tempDate)
      }
      this.$refs.menu.save(this.date)
    },
    onTextFieldFocus($event) {
      this.isTextFieldFocused = true
      this.$nextTick(()=>{
        $event.target.select()
      })
    },
    onTextFieldBlur() {
      if (this.isTextFieldTyped) {
        this.setDate(this.tempDate)
        this.isTextFieldTyped = false
      }
      this.isTextFieldFocused = false
    },
    onTextFieldTyped() {
      if (!this.isTextFieldTyped) {
        this.isTextFieldTyped = true
        this.isMenuOpen = false
      }
    },
    onTextFieldEnterKey() {
      this.$refs.text.blur()
    },
    reset() {
      this.date = null
      this.tempDate = null
    },
    onlyFutureRule: function(date) {
      return v=> (!v || helperDateTime.parseDateTime(this.date).isAfter(helperDateTime.today())) || ((!isString(this.onlyFuture)) ? 'Date should be after today' : this.onlyFuture)
    },
    onlyHappenRule: function() {
      return v=> (!v || helperDateTime.parseDateTime(this.date).isSameOrBefore(helperDateTime.today())) || ((!isString(this.onlyHappen)) ? 'Date should be already happened' : this.onlyHappen)
    },
    onTextFieldClear() {
      this.reset()
    }
  },
  mounted() {
    this.setDate(this.value)
    moment.locale(this.$store.getters.getConfig('locale'))
  },
  props: {
    value: {
      default: null
    },
    birthDate : {
      type: Boolean,
      default: false
    },
    pickerOnly: {
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
  }
}
</script>

<style lang="css">
</style>
