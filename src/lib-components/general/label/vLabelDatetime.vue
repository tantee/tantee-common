<template>
  <label>
    {{ dateTimeText }}
  </label>
</template>

<script>
import { isUndefined } from 'lodash'
import * as helper from '@/lib/helperDateTime'

export default {
  data: ()=>({
    dateTimeText : null,
  }),
  props: {
    dateTime: {
      type: String,
      default: undefined
    },
    tinyDate: {
      type: Boolean,
      default: false
    },
    shortDate: {
      type: Boolean,
      default: false
    },
    longDate: {
      type: Boolean,
      default: false
    },
    tinyDateTime: {
      type: Boolean,
      default: false
    },
    shortDateTime: {
      type: Boolean,
      default: false
    },
    longDateTime: {
      type: Boolean,
      default: false
    },
  },
  watch: {
    dateTime: function() {
      this.loadDateTime()
    }
  },
  methods: {
    loadDateTime() {
      if (!isUndefined(this.dateTime)) {
        if (this.tinyDate) this.dateTimeText = helper.toTinyDate(this.dateTime)
        else if (this.shortDate) this.dateTimeText = helper.toShortDate(this.dateTime)
        else if (this.longDate) this.dateTimeText = helper.toLongDate(this.dateTime)
        else if (this.tinyDateTime) this.dateTimeText = helper.toTinyDateTime(this.dateTime)
        else if (this.shortDateTime) this.dateTimeText = helper.toShortDateTime(this.dateTime)
        else if (this.longDateTime) this.dateTimeText = helper.toLongDateTime(this.dateTime)
        else this.dateTimeText = helper.toLongDateTime(this.dateTime)
      }
    }
  },
  mounted() {
    this.loadDateTime()
  }
}
</script>

<style lang="css">
</style>
