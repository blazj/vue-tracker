<template>
  <div class="mt-4 songs">
    <panel title="Create song" subtitle="Add songs to database">
      <div slot="panel">
        <div class="px-8 py-8">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="song.title"
              :rules="song.commonRules"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.artist"
              :rules="song.commonRules"
              label="Artist"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.album"
              :rules="song.commonRules"
              label="Album"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.genre"
              :rules="song.commonRules"
              label="Genre"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.albumImageURL"
              :rules="song.commonRules"
              label="Album Image URL"
              required
            ></v-text-field>
            <v-text-field
              v-model="song.youtubeID"
              :rules="song.commonRules"
              label="Youtube ID"
              required
            ></v-text-field>
            <v-textarea
              name="input-7-1"
              label="Lyrics"
              v-model="song.lyrics"
              hint="Input lyrics here."
            ></v-textarea>
            <v-btn
              color="success"
              class="mr-4"
              @click="validate"
            >
              Submit
            </v-btn>
            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Clear
            </v-btn>
          </v-form>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
import SongsService from '@/services/SongsService'

  export default {
    data () {
      return {
        song: {
          title: "",
          artist: "",
          album: "",
          genre: "",
          albumImageURL: "",
          youtubeID: "",
          lyrics: "",
          tab: "",
          name: '',
          commonRules: [
            (v) => !!v || 'Field is required',
            (v) => (v && v.length <= 200) || 'Field must be less than 200 characters',
          ],
        },
        valid: false,
      }
    },
    methods: {
      userinput () {
        console.log("bla")
      },
      async validate () {
        this.$refs.form.validate()
        if (this.valid) {
          const res = await SongsService.create(this.song)
          this.$router.push({
            name: 'songs'
          })
          console.log(res)
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style scoped>

</style>