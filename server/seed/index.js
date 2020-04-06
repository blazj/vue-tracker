const { 
  sequelize,
  User,
  Song,
  Bookmark,
  History
} = require('../src/models')

const Promise = require('bluebird')
const delay = require('delay')
const songs = require('./songs.json')
const users = require('./users.json')
const bookmarks = require('./bookmarks.json')
const historys = require('./history.json')

sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )
    await Promise.all(
      songs.map(song => {
        Song.create(song)
      })
    )
    await delay(200)

    await Promise.all(
      bookmarks.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )
    await Promise.all(
      historys.map(history => {
        History.create(history)
      })
    )
  })
