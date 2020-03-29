<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    prepend-icon="person"
                    type="email"
                    name="email"/>

                  <v-text-field
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="login" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
            <v-spacer />
            <v-alert
              class="mt-4 transition-swing"
              v-if="error"
              border="right"
              colored-border
              type="error"
              elevation="12"
              transition="scale-transition">
              <span v-html="error"></span>
            </v-alert>
            <v-alert
              class="mt-4 transition-swing"
              v-if="login_ok"
              border="right"
              colored-border
              type="success"
              elevation="12"
              transition="scale-transition">
              <span>Login successfull!</span>
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  props: {
      source: String,
    },
  data () {
    return {
      email: "",
      password: "",
      error: false,
      login_ok: false
    }
  },
  watch: {
    email(value) {
      console.log("email has changed", value)
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.email = "hello world"
    // }, 2000)
  },
  methods: {
    async login () {
      try {
        const res = await AuthenticationService.login({
          email: this.email,
          password: this.password
        }) 
        if (res.data.user) {
          this.error = false
          this.login_ok = true
        }
      } catch (error) {
        this.error = error.response.data.error
        this.login_ok = false
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.6em; 
}
</style>