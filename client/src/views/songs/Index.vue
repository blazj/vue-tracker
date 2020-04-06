<template>
  <div class="mt-4 songs">
    <v-container>
      <v-row>
        <v-col cols="sm">
          <songs-search-panel></songs-search-panel>
          <songs-panel></songs-panel>
        </v-col>
        <v-col v-if="isUserLoggedIn" cols="sm">
          <bookmarks-table></bookmarks-table>
          <recently-viewed></recently-viewed>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'
import SongsPanel from '@/views/songs/SongsPanel.vue';
import SongsSearchPanel from '@/views/songs/SongsSearchPanel.vue';
import BookmarksTable from '@/views/songs/BookmarksTable.vue';
import RecentlyViewed from '@/views/songs/RecentlyViewed.vue';
import {mapState} from 'vuex'

export default {
  components: {
    SongsPanel,
    SongsSearchPanel,
    BookmarksTable,
    RecentlyViewed
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
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