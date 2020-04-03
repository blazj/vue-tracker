<template>
  <div class="mt-4 songs">
    <v-container fluid>
      <v-row dense>
        <v-col :cols="6">
          <panel :title="song.title" :subtitle="song.artist">
            <div slot="panel">
              <v-row dense>
                <v-col :cols="6">
                  <v-list shaped>
                    <v-list-item-group color="primary">
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{song.artist}}</v-list-item-title>
                          <v-list-item-subtitle>Artist</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-album</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{song.album}}</v-list-item-title>
                          <v-list-item-subtitle>Album</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-music</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>{{song.genre}}</v-list-item-title>
                          <v-list-item-subtitle>Genre</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>mdi-movie</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content @click="songClick(song.youtubeID)">
                          <v-list-item-title>{{song.youtubeID}}</v-list-item-title>
                          <v-list-item-subtitle>YouTube</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col :cols="6">
                    <v-img
                      :src="song.albumImageURL"
                      max-height="200"
                      contain
                    >
                  </v-img>
                </v-col>
              </v-row>
              <v-row class="mb-4 justify-end">
                <v-col :cols="6">
                  <v-btn depressed color="primary" @click="navigateTo({
                    name: 'songs',
                  })">Back</v-btn>
                  <v-btn class="mx-1" depressed outlined color="primary" @click="navigateTo({
                    name: 'song-edit',
                    params: {
                      songId: song.id
                    }})">Edit</v-btn>
                  <v-btn outlined depressed color="error" @click="deleteSong">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </panel>
        </v-col>
        <v-col :cols="6">
          <panel title="Lyrics" subtitle="Try out your beautiful voice.">
            <div slot="panel">
              <div class="px-4 pb-4" v-html="song.lyrics"></div>
            </div>
          </panel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import SongsService from '@/services/SongsService'

  export default {
    data () {
      return {
        song: {},
        songId: null
      }
    },
    async mounted () {
      this.songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(this.songId)).data
      console.log(this.song)
    },
    methods: {
      songClick (songURL) {
        window.open('https://www.youtube.com/watch?v=' + songURL, '_blank');
        console.log("songClick")
      },
      async deleteSong() {
        const res = await SongsService.delete(this.songId)
        console.log(res)
      },
      navigateTo (route) {
        this.$router.push(route)
      },
    }
  }
</script>

<style scoped>

</style>