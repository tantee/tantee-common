import { isUndefined,isEqual,cloneDeep } from 'lodash'
export default {
  data: ()=>({
    subFormData: {},
  }),
  props: {
    value: {
      type: Object | Array,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (!isEqual(this.subFormData,newVal) || isEqual({},newVal) || isUndefined(newVal)) this.loadData()
      },
      deep: true
    },
    subFormData: {
      handler(newVal) {
        this.$emit("input",newVal)
      },
      deep: true
    },
  },
  methods: {
    loadData() {
      if (!isUndefined(this.initialData) && isUndefined(this.value)) {
        this.subFormData = Object.assign({},this.initialData)
      } else {
        this.subFormData = this.value
        if (!isUndefined(this.initialData)) {
          Object.keys(this.initialData).forEach((key)=>{
            if (isUndefined(this.subFormData[key])) this.$set(this.subFormData, key, cloneDeep(this.initialData[key]))
          })
        }
      }
    },
  },
  mounted() {
    this.loadData()
  },
}
