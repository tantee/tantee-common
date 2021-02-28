<template>
  <v-menu ref="menu"
    :close-on-content-click="false"
    v-model="isMenuOpen"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        ref="text"
        v-model="tempTime"
        v-bind="$attrs"
        :readonly="textReadOnly || readonly"
        @focus="onTextFieldFocus"
        @blur="onTextFieldBlur"
        @keydown="onTextFieldTyped"
        @keyup.enter="onTextFieldEnterKey"
        @click:clear="onTextFieldClear"
        v-on="(!readonly) ? on : undefined"
      ></v-text-field>
    </template>
    <v-digital-time-picker
      ref="picker"
      v-model="time"
      @change="setTimePicker"
    ></v-digital-time-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'
import * as helperDateTime from '@/lib/helperDateTime'

export default {
  data: ()=>({
    time: null,
    tempTime: null,
    isMenuOpen: false,
    isTextFieldFocused: false,
    isTextFieldTyped: false,
  }),
  computed: {
    textReadOnly() {
      return this.pickerOnly
    }
  },
  watch: {
    time: function(newValue) {
      this.$emit('input',newValue)
    },
    value: function(newValue) {
      this.setTime(newValue)
    },
    isTextFieldFocused: function(newValue) {
      if (newValue) this.tempTime = this.time
      else this.tempTime = helperDateTime.toStringTime(this.time)
    }
  },
  methods: {
    setTimePicker(time) {
      this.setTime(time)
    },
    setTime(timeString) {
      if (!helperDateTime.isValidTime(timeString))  {
        this.tempTime = null
        this.time = null
      } else {
        this.time = helperDateTime.parseTime(timeString).format('HH:mm:ss')
        this.tempTime = this.time

        if (!this.isTextFieldFocused) this.tempTime = helperDateTime.toStringTime(this.tempTime)
      }
      this.$refs.menu.save(this.time)
    },
    onTextFieldFocus($event) {
      this.isTextFieldFocused = true
      this.$nextTick(()=>{
        $event.target.select()
      })
    },
    onTextFieldBlur() {
      if (this.isTextFieldTyped) {
        this.setTime(this.tempTime)
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
      this.time = null
      this.tempTime = null
    },
    onTextFieldClear() {
      this.reset()
    }
  },
  mounted() {
    this.setTime(this.value)
    moment.locale(this.$store.getters.getConfig('locale'))
  },
  props: {
    value: {
      default: null
    },
    pickerOnly: {
      type: Boolean,
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
