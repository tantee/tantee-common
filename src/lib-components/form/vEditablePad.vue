<template>
  <v-card>
    <v-card-title primary-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-btn
        fab
        small
        @click="isEditing = !isEditing"
      >
        <v-icon v-if="isEditing">mdi-close</v-icon>
        <v-icon v-else>mdi-pencil</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-form-pad v-model="editData" :disabled="!isEditing" v-slot="{data,rules}" :template="template">
        <slot :data="data" :rules="rules" :disabled="!isEditing"></slot>
      </v-form-pad>
    </v-card-text>
    <v-card-actions v-if="isEditing">
      <v-spacer></v-spacer>
      <v-btn @click="saveData" :disabled="!isDataChange">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import * as api from '@/lib/api'
import { isUndefined,isEqual,cloneDeep } from 'lodash'

export default {
  data: ()=>({
    isEditing: false,
    editData: {},
    originalData: {},
  }),
  props: {
    updateApi: {
      type: [Array, String],
      default: undefined,
    },
    initialData: {
      type: Object,
      default: ()=>{},
    },
    title: {
      type: String,
      default: 'Form Data'
    },
    value: {
      type: Object,
      default: ()=>{}
    },
    template: {
      type: String,
      default: undefined
    }
  },
  methods: {
    saveData() {
      if (!isUndefined(this.updateApi)) {
        let updateData = Object.assign({},this.initialData,this.editData)
        let config = {
          params : {
            returnData: 1
          }
        }
        let savePromise = api.post(this.updateApi,updateData,config).then((returnData)=>{
          if (!returnData.success) {
            this.$store.dispatch('addAlertItem',{
              alertLocation: 'top',
              alertType: 'error',
              alertText: 'Failed to save data'
            })
          } else {
            this.$store.dispatch('addAlertItem',{
              alertLocation: 'top',
              alertType: 'success',
              alertText: 'Successfully save data'
            })
            if (returnData.data.length>0) {
              this.$emit('save',returnData.data[0])
              this.$emit('input',returnData.data[0])
            } else {
              this.$emit('save',this.editData)
              this.$emit('input',this.editData)
            }
          }
        })
        .catch((e)=>{
          void e
        })

        Promise.all([savePromise]).then(()=>{
          this.isEditing = false
        })

      } else {
        this.$emit('save',this.editData)
        this.$emit('input',this.editData)
        this.isEditing = false
      }
    },
  },
  computed: {
    isDataChange : function () {
      return !isEqual(this.editData,this.originalData)
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.editData = cloneDeep(newVal)
        this.originalData = cloneDeep(newVal)
      },
      deep: true
    },
    isEditing: function (newVal) {
      if (!newVal) {
        if (this.isDataChange) {
          this.$confirm('มีการแก้ไขข้อมูล ต้องการที่จะบันทึกหรือไม่').then((res)=>{
            if (res) {
              this.saveData()
            } else {
              this.editData = cloneDeep(this.originalData)
            }
          })
        }
      } else {
        this.originalData = cloneDeep(this.editData)
      }
    }
  },
  beforeMount() {
    this.editData = cloneDeep(this.value)
  },
}
</script>

<style lang="css" scoped>
</style>
