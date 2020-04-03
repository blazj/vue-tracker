<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title> 
          <router-link
            class="home"
            tag="span"
            :to="{
              name: 'home'
            }">
            Songify</router-link>
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="mx-1" depressed color="white" text small @click="navigateTo({name: 'home'})">Home</v-btn>
      <v-btn class="mx-1" depressed color="white" outlined small @click="navigateTo({name: 'songs'})">Browse</v-btn>
      <!-- <v-btn depressed color="white" text small @click="navigateTo({name: 'about'})">About</v-btn>  -->
      <v-btn class="mx-1" depressed color="secondary" small @click="navigateTo({name: 'register'})">SIGN UP</v-btn>
      <v-btn class="mx-1" depressed color="white" text small v-if="!$store.state.isUserLoggedIn" @click="navigateTo({name: 'login'})">Login</v-btn> 
      <v-btn class="mx-1" depressed color="white" text small v-if="$store.state.isUserLoggedIn" @click="logout">Logout</v-btn> 

    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    // HelloWorld,
  },
  data () {
    return {
      email: "",
    }
  },
  methods: {
    async logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: ' songs'
      })
    },
    async navigateTo (route) {
      this.$router.push(route)
    }
  }
};
</script>
