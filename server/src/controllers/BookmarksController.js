const { Bookmark, Song, User } = require('../models')
const { Op } = require('sequelize')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      console.log(req.query)
      console.log(req.query)
      console.log(req.query)
      const userId = req.user.id
      const {songId} = req.query
      const where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
        const bookmark = await Bookmark.findAll({
          where: where
        })
        res.send(bookmark)
      } else {
        const bookmark = await Bookmark.findAll({
          where: where,
          include: [
            {
              model: Song
            }
          ]
        }).map(bookmark => bookmark.toJSON())
          .map(bookmark => _.extend({
            bookmarkId: bookmark.id
          }, bookmark.Song))
        res.send(bookmark)
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `Error occured while fetching bookmarks: ${err}`
      })
    }
  },
  async post (req, res) {
    try {
      const {SongId} = req.body
      const UserId = req.user.id
      console.log('bookmark: ', SongId, UserId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: SongId,
          UserId: UserId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'You already have a bookmark with these params.'
        })
      }
      const res_bookmark = await Bookmark.create({
        SongId: SongId,
        UserId: UserId
      })
      res.send(res_bookmark)
    } catch (err) {
      res.status(500).send({
        error: `Error occured while creating bookmark: ${err}`
      })
    }
  },
  async delete (req, res) {
    try {
      const { bookmarkId } = req.params
      const userId = req.user.id
      console.log(userId, bookmarkId)
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'You do not have access to this bookmark.'
        })
      }
      await bookmark.destroy()
      res.send(bookmark) 
    } catch (err) {
      res.status(500).send({
        error: `Error occured while deleting bookmark: ${err}`
      })
    }
  }
}
