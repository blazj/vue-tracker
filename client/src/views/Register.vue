<template>
  <div class="register">
    <h1>This is a Register page.</h1>
    <input 
      v-model="email"
      type="email"
      name="email"
      placeholder="Email" />
    <br />
    <input 
      v-model="password"
      type="password"
      name="password"
      placeholder="Password" />
    <br />
    <button
      @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      email: "abc",
      password: "123"
    }
  },
  watch: {
    email(value) {
      console.log("email has changed", value)
    }
  },
  mounted () {
    setTimeout(() => {
      this.email = "hello world"
    }, 2000)
  },
  methods: {
    async register () {
      console.log("Button click")
      const res = await AuthenticationService.register({
        email: this.email,
        password: this.password
      }) 
      console.log(res.data)
    }
  }
}
</script>
