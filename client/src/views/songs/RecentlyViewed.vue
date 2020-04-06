<template>
  <div class="mt-4">
    <panel title="Recently viewed" subtitle="List of recently viewed songs">
      <div slot="panel">
        <template>
          <v-data-table
            :headers="headers"
            :items="historys"
            :items-per-page="5"
            item-key="historyId"
            :sort-by="historys.createdAt"
            :sort-desc="false"
          ></v-data-table>
        </template>
      </div>
    </panel>
  </div>
</template>

<script>
import SongsHistoryService from '@/services/SongsHistoryService'
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
        historys: [],
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
        this.historys = (await SongsHistoryService.index()).data
      }
      console.log(this.historys)
    }
  }
</script>

<style scoped>

</style>