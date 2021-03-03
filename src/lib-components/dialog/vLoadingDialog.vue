<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text class="pa-3">
        {{ message }}
        <v-progress-linear indeterminate color="white" class="mb-0 mt-3"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { isUndefined,isArray,isFunction } from 'lodash'

export default {
  data: ()=>({
    dialog: true,
    task: undefined,
  }),
  props: {
    message: {
      type: String,
      default: 'Loading'
    }
  },
  methods: {
    done() {
      this.dialog = false
      this.$destroy()
    },
    loadTask(tasks) {
      let promiseTasks = []
      if (!isArray(tasks)) tasks = [tasks]
      tasks.forEach((task)=>{
        if (!isUndefined(task) ) {
          if (typeof task.then == 'function') promiseTasks.push(task)
          else if (isFunction(task)) task()
        }
      })
      Promise.all(promiseTasks).finally(()=>{
        this.$nextTick(()=>{
          this.done()
        })
      })
    }
  },
  mounted() {
    this.loadTask(this.task)
  }
}
</script>

<style lang="css" scoped>
</style>
