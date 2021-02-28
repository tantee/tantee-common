<template>
  <v-card>
    <v-card-text>
      <v-container pa-0>
        <v-row dense>
          <v-col cols="12" md="3">
            <v-row>
              <v-col cols="12">
                <v-btn class="ma-1" @click="onScanData" :disabled="isUploading" :loading="isScanning"><v-icon>scanner</v-icon>&nbsp;Scan</v-btn>
                <v-file-btn class="ma-1" @fileSelected="onUploadData" accept="image/*" :disabled="isScanning" :loading="isUploading" multiple><v-icon>cloud_upload</v-icon>&nbsp;Upload</v-file-btn>
              </v-col>
              <v-col cols="12">
                <v-form-pad v-model="scanParam" no-parent-reset no-parent-validate>
                  <template v-slot="{data}">
                    <v-row>
                      <v-col cols="6">
                        <v-switch v-model="data.feeder" label="Feeder" :value="1"></v-switch>
                      </v-col>
                      <v-col cols="6">
                        <v-switch v-model="data.duplex" label="Duplex" :value="1"></v-switch>
                      </v-col>
                      <v-col>
                        <v-select
                          label="Color"
                          :items="[
                            {text: 'Color', value: 1},
                            {text: 'Grayscale', value: 2},
                            {text: 'Black & White', value: 4},
                          ]"
                          v-model="data.color"
                          item-text="text"
                          item-value="value"
                        >
                        </v-select>
                      </v-col>
                    </v-row>
                  </template>
                </v-form-pad>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="9">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="3" v-for="(scanDataItem,index) in scanData" :key="index">
                  <v-card>
                    <v-btn color="primary" fab small top right absolute @click="onDeleteItem(index)"><v-icon>delete</v-icon></v-btn>
                    <v-card-text class="pb-0">
                      <v-img-with-edit v-model="scanData[index].base64string" height="250" contain></v-img-with-edit>
                      <v-text-field v-model="scanData[index].referenceId" label="Reference ID" hide-details></v-text-field>
                      <v-master-field group-key="documentCategory" v-model="scanData[index].category" label="Category" :show-only="availableCategory" show-code></v-master-field>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { isUndefined,isArray } from 'lodash'
import getScanner from '@/modules/getScanner'

export default {
  data: ()=>({
    editComponent: undefined,
    scanData: [],
    isMouseHover: false,
    isUploading: false,
    isScanning: false,
    dialog: false,
    scanParam: {
      feeder: 1,
      duplex: 1,
      color: 2, //color=1, grayscale=2, b&w=4
      resolution: 150,
      limit: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    }
  }),
  props: {
    value: {
      default: ()=>[]
    },
    availableCategory: {
      type: Array,
      default: undefined
    }
  },
  methods: {
    onUploadData(files) {
      this.isUploading = true
      if (files.length>0) {
        Array.from(files).forEach((file)=>{
          var reader = new FileReader()
          reader.onload = () => {
            this.scanData.push({
              base64string: reader.result
            })
          }
          reader.readAsDataURL(file)
        })
      }
      this.isUploading = false
    },
    onScanData() {
      this.isScanning = true
      getScanner(this.scanParam).then((returnData)=>{
        returnData.forEach((pageData)=>{
          this.scanData.push({
            base64string: pageData
          })
        })
      })
      .catch((e)=>void e)
      .finally(()=>{
        this.isScanning = false
      })
    },
    onDeleteItem(index) {
      this.scanData.splice(index,1)
    }
  },
  computed: {
    hasScanData() {
      if (isUndefined(this.scanData)) {
        return false
      } else {
        return true
      }
    },
  },
  watch: {
    value: {
      handler(newVal) {
        if (isArray(newVal)) this.scanData = newVal
        else this.scanData = []
      },
      deep: true
    },
    scanData: {
      handler(newVal) {
        this.$emit('input',newVal)
      },
      deep: true
    },
  }
}
</script>

<style lang="css">
.overlay-container {
  position: relative;
}
.overlay-btn {
  position: absolute !important;
  top: 0;
  left: 0;
  z-index: 100;
}
.cropper-container {
  background-repeat: repeat !important;
}
</style>
