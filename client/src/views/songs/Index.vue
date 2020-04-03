<template>
  <div class="mt-4 songs">
    <songs-search-panel></songs-search-panel>
    <songs-panel></songs-panel>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsPanel from '@/views/songs/SongsPanel.vue';
import SongsSearchPanel from '@/views/songs/SongsSearchPanel.vue';

export default {
  components: {
    SongsPanel,
    SongsSearchPanel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    // this.songs = (await SongsService.index()).data
    // console.log(this.songs)
    // do a request to the backend for all songs

  },
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
  }
}
</script>

<style scoped>

</style>