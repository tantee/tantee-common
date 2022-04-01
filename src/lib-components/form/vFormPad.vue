<template>
  <v-form ref="form" v-model="isValid" v-if="!template" :disabled="disabled">
    <slot :data="data" :rules="rules" :documentStatus="documentStatus"></slot>
  </v-form>
  <component :is="formComponent" ref="form" v-model="data" v-bind="$props" v-else></component>
</template>

<script>
import Vue from 'vue'
import { isPlainObject,isUndefined,has,isFunction,isInteger,find,debounce } from 'lodash'

const vFormPadMixin = {
  data: () => ({
    data: {},
    isValid: true,
    rules: {
      require: (customError=undefined) => { return v => (!!v || v===false || v===0) || ((isUndefined(customError)) ? 'This field is required' : customError)},
      requireIf: (condition, customError=undefined) => { return v => ((!!v || v===false || v===0) || !condition) || ((isUndefined(customError)) ? 'This field is required' : customError)},
      requireTrue: (customError=undefined) => { return v => !!v || ((isUndefined(customError)) ? 'This field is must be true' : customError)},
      requireTrueIf: (condition, customError=undefined) => { return v => (!!v || !condition) || ((isUndefined(customError)) ? 'This field is required' : customError)},
      numeric: (customError=undefined) => { return v => (!v || !isNaN(v)) || ((isUndefined(customError)) ? 'This field must be number' : customError)},
      range: (minValue=null,maxValue=null,customError=undefined) => { return v => 
        (!v || ((!minValue || v>=minValue) && (!maxValue || v<=maxValue))) || 
        ((isUndefined(customError)) ? 'Value is out of range ('+((minValue) ? minValue : '?')+'-'+((maxValue) ? maxValue : '?')+')' : customError)
      },
      integer: (customError=undefined) => { return v => (!v || isInteger(v) || /^\+?-?\d+$/.test(v)) || ((isUndefined(customError)) ? 'This field must be integer' : customError)},
      unique: (data,fieldName,customError=undefined) => { return v => (!v || !data || !find(data,[fieldName,v])) || ((isUndefined(customError)) ? 'This field must be unique' : customError)},
      length: (length,customError=undefined) => { return v=> (!v || v.length==length) || ((isUndefined(customError)) ? 'Length must be '+length : customError)},
      lengthGreater: (length,customError=undefined) => { return v=> (!v || v.length>=length) || ((isUndefined(customError)) ? 'Length must greater than '+length : customError)},
      lengthLess: (length,customError=undefined) => { return v=> (!v || v.length<=length) || ((isUndefined(customError)) ? 'Length must less than '+length : customError)},
      telephone: (customError=undefined) => {return v=> (!v || /^(?:[\s]*(?:0[23457]{1}[0-9]{7}|0[689]{1}[0-9]{8})(?:#[0-9]{1,5})?\s*(?:\([^\(\)]+\))?[\s]*(?:,(?=.+))?)*$/.test(v)) || ((isUndefined(customError)) ? 'Invalid telephone number' : customError)},
      email: (customError=undefined) => {return v=> (!v || /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v)) || ((isUndefined(customError)) ? 'Invalid telephone number' : customError)},
      regex: (regex,customError=undefined) => { return v=> (!v || (new RegExp(regex)).test(v)) || ((isUndefined(customError)) ? 'Invalid format' : customError)},
    },
    debounceBuildTemplate: undefined,
  }),
  props: {
    value: {
      type: Object | Array,
      default: ()=>({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    documentStatus: {
      type: String,
      default: 'draft'
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    reset: function() {
      if (!isUndefined(this.$refs.form)) {
        this.actionDeep('reset',this.$refs.form)
      }
      Object.keys(this.data).forEach((key) => delete this.data[key]);
    },
    validate: function() {
      if (this.preview) return true
      
      let result = true
      if (!isUndefined(this.$refs.form)) {
        result = this.actionDeep('validate',this.$refs.form) && result
      }
      return result
    },
    actionDeep(action,form,inputs=undefined) {
      let result = true

      if (isUndefined(inputs) && !isUndefined(form.inputs)) inputs = form.inputs
      if (isUndefined(inputs)) inputs = []

      if (!isUndefined(form.$children) && (form.$children.length > 0)) {
        form.$children.forEach((child)=>{
          if (!inputs.includes(child) && child.$options._componentTag!=='v-form-pad') {
            result = this.actionDeep(action,child,inputs) && result
          }
          if (child.$options._componentTag=='v-form-pad' && !has(child.$attrs,'no-parent-'+action)) {
            if (has(child,action) && (isFunction(eval('child.'+action)))) result = eval('child.'+action+'()') && result
          }
        })
      }
      if (has(form,action) && (isFunction(eval('form.'+action)))) {
        result = eval('form.'+action+'()') && result
      }
      return result
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (isPlainObject(newVal)) this.data = newVal
        else this.data = {}
      },
      deep: true
    },
    data: {
      handler(newVal) {
        this.$emit('input',newVal)
      },
      deep: true
    },
  },
  beforeMount() {
    if (!isUndefined(this.value) && isPlainObject(this.value)) this.data = this.value
  },
}

export default {
  mixins: [vFormPadMixin],
  data: () => ({
    formComponent: null
  }),
  props: {
    template: {
      type: String,
      default: undefined
    },
    templateScript: {
      type: [String, Object],
      default: ''
    }
  },
  methods: {
    buildTemplate: function() {
      let originalConsoleError = console.error

      console.error = function(error) {
        throw new Error(error);
      };

      try {
        let tmpTemplate = this.template.toString()
        tmpTemplate = tmpTemplate.replace(/(<(?:v-[^>\s]+))((?:(?!readonly)[^>\"]|\"[^\"]*\")*>)/g,'$1 :readonly="disabled"$2')

        Vue.compile(`<v-form ref="form" v-model="isValid" :readonly="disabled">${tmpTemplate}</v-form>`)

        let templateMixin = undefined
        try {
          templateMixin = Function('"use strict";return (' + this.templateScript + ')')()
        } catch(e) {
          void e
        }
        let tempFormComponent = {
            template: `<v-form ref="form" v-model="isValid" :readonly="disabled">${tmpTemplate}</v-form>`,
            mixins: [vFormPadMixin]
          }
        if (templateMixin) tempFormComponent.mixins.push(templateMixin)
        this.formComponent = tempFormComponent
      } catch(e) {
        void e
        let tempFormComponent = {
            template: `<v-form ref="form" v-model="isValid" :readonly="disabled"></v-form>`,
            mixins: [vFormPadMixin]
        }
        this.formComponent = tempFormComponent
      }

      console.error = originalConsoleError
    }
  },
  watch: {
    template: function () {
      this.debounceBuildTemplate()
    },
    templateScript: function () {
      this.debounceBuildTemplate()
    }
  },
  beforeMount() {
    if (!isUndefined(this.template)) this.buildTemplate()
    this.debounceBuildTemplate = debounce(this.buildTemplate,3000,{ leading: true })
  },
}
</script>

<style lang="css">
</style>
