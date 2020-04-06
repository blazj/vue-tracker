<template>
  <div>
    <panel title="Search">
      <div slot="panel">
        <v-row class="justify-center">
          <v-col cols="12" sm="11">
            <v-text-field
                label="Search song by title, artist, album or genre"
                prepend-icon="search"
                v-model="search"
              ></v-text-field>
          </v-col>
        </v-row>
      </div>
    </panel>
  </div>
</template>

<script>
  import _ from 'lodash'

export default {

  data () {
    return {
      search: "",
    }
  },
  watch: {
    search: _.debounce( async function (value) {
      console.log(value)
      const route = {
        name: 'songs' 
      }
      if (this.search !== ''){
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route) 
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>