import Api from '@/services/Api'

export default {
  index (search) {
		return Api().get('songs', {
			params: {
				search: search
			}
		})
	},
  show (songId) {
		return Api().get(`songs/${songId}`)
	},
  delete (songId) {
		return Api().delete(`songs/${songId}`)
	},
	create (song) {
		return Api().post('songs', song)
	},
	put (song) {
		return Api().put(`songs/${song.id}`, song)
	}
}

// index/ -> get all elements
// show/ -> get specific element by ID 