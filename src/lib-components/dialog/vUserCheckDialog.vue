<template>
  <v-dialog value="true" max-width="600" @keydown.esc="choose(false)" persistent>
    <v-card tile>
      <v-toolbar flat color="primary">
        <v-icon class="white--text">mdi-login</v-icon>&nbsp;
        <v-toolbar-title class="white--text">Login Form</v-toolbar-title>
      </v-toolbar>
      <v-form @submit.prevent="login">
      <v-card-text>
          <v-text-field v-model="loginData.username" prepend-icon="person" name="login" label="Login" type="text" ref="username" :disabled="verifyCurrentUser" autocomplete="off"></v-text-field>
          <v-text-field v-model="loginData.password" prepend-icon="lock" name="password" label="Password" type="password" ref="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" text type="submit">Login</v-btn>
        <v-btn text @click="choose(false)" v-if="!mustLogin">Cancel</v-btn>
      </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    loginData: {}
  }),
  props: {
    mustLogin: {
      type: Boolean,
      default: false
    },
    verifyCurrentUser: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login() {
      this.$store.dispatch((this.verifyCurrentUser) ? 'verify' : 'login',this.loginData).then((result)=>{
        if (result) this.choose(result)
      })
      .catch((e)=>{
        void e
      })
      .finally(()=>{
        this.reset()
      })
    },
    choose(value) {
      this.$emit('result', value)
      this.value = value
      this.$destroy()
    },
    reset() {
      this.loginData = {}
      if (this.verifyCurrentUser) {
        this.loginData.username = this.$store.getters.getCurrentUser.username
        this.$nextTick(()=>{
          if (this.$refs.username) this.$refs.username.focus()
        })
      } else {
        this.$nextTick(()=>{
          if (this.$refs.password) this.$refs.password.focus()
        })
      }
    }
  },
  mounted() {
    this.reset()
  },
}
</script>

<style lang="css" scoped>
</style>
