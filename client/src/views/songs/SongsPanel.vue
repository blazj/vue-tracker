<template>
  <div class="mt-4 songs">
    <panel title="Songs" subtitle="All songs in database">
      <div slot="panel">
        <v-list two-line>
          <template v-for="(song) in songs">
            <v-divider :key="song.id"></v-divider>
            <v-list-item :key="'A'+song.id">
              <v-list-item-avatar tile size="100">
                <v-img :src="song.albumImageURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="song.title"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-html=song.artist></v-list-item-subtitle>
                <v-list-item-subtitle v-html="song.album"></v-list-item-subtitle>
                <v-list-item-subtitle v-html="song.genre"></v-list-item-subtitle>
                <v-list-item-subtitle> </v-list-item-subtitle>
              </v-list-item-content>
              <v-btn depressed small color="primary" @click="navigateTo({
                name: 'song',
                params: {
                  songId: song.id
                }
              })">View Song</v-btn>
              <v-btn class="mx-1" depressed small outlined color="primary" @click="navigateTo({
                name: 'song-edit',
                params: {
                  songId: song.id
                }})">Edit</v-btn>
              <v-btn outlined depressed small color="error" @click="deleteSong(song.songId)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </panel>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  data () {
    return {
      songs: null
    }
  },
  // async mounted () {
  //   this.songs = (await SongsService.index()).data
  //   console.log(this.songs)
  //   // do a request to the backend for all songs
  methods: {
    songClick (songURL) {
      window.open('https://www.youtube.com/watch?v=' + songURL, '_blank');
      console.log("songClick")
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    async deleteSong(songId) {
      const res = await SongsService.delete(songId)
      console.log(res)
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>

</style>