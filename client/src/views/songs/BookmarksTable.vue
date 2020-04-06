<template>
  <div>
    <panel title="Bookmarks" subtitle="List of user bookmarks">
      <div slot="panel">
        <template>
          <v-data-table
            :headers="headers"
            :items="bookmarks"
            :items-per-page="5"
          ></v-data-table>
        </template>
      </div>
    </panel>
  </div>
</template>

<script>
import BookmarkService from '@/services/BookmarkService'
import {mapState} from 'vuex'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Title',
            align: 'start',
            value: 'title',
          },
          { 
            text: 'Artist', 
            value: 'artist' 
          },
          { 
            text: 'Album', 
            value: 'album' 
          },
          { 
            text: 'Genre', 
            value: 'genre' 
          },
        ],
        desserts: [
          {
            name: 'Bubit',
            title: 'Bubit',
            artist: 'Bubit',
            album: 'Bubit',
            genre: 'Bubit',
          },
          {
            name: 'Cuci',
            title: 'Cuci',
            artist: 'Cuci',
            album: 'Cuci',
            genre: 'Cuci',
          },
        ],
        bookmarks: [],
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user'
      ])
    },
    async mounted () {
      if (this.isUserLoggedIn){
        this.bookmarks = (await BookmarkService.index()).data
      }
      console.log(this.bookmarks)
    }
  }
</script>

<style scoped>

</style>