<template>
  <codemirror ref="editor" v-model="content" :options="cmOptions" @focus="onFocus"/>
</template>

<script>
import { codemirror } from 'vue-codemirror'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/vue/vue.js'

import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/closetag.js'
import 'codemirror/addon/display/autorefresh.js'

export default {
  components: {
    codemirror
  },
  data: ()=>({
    content: '',
  }),
  props: {
    lang: {
      type: String,
      default: 'vue'
    },
    value: {
      type: String,
      default: ''
    },
    lineNumbers: {
      type: Boolean,
      default: true
    },
    light: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    cmOptions() {
      return {
        tabSize: 4,
        mode: this.lang,
        theme: 'base16-'+((this.light) ? 'light' : 'dark'),
        lineNumbers: this.lineNumbers,
        line: true,
        autoCloseBrackets: true,
        autoCloseTags: true,
        autoRefresh: true,
      }
    }
  },
  methods: {
    onFocus() {
      this.$refs.editor.refresh()
    },
  },
  watch: {
    value(newVal) {
      this.content = newVal || ''
    },
    content(newVal) {
      this.$emit('input',newVal)
    }
  },
  mounted() {
    this.content = this.value || ''
    this.$refs.editor.refresh()
  }
}
</script>

<style lang="css">
</style>
