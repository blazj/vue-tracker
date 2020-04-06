const { History, Song, User } = require('../models')
const { Op } = require('sequelize')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const where = {
        UserId: userId
      }
      const historys = await History.findAll({
        where: where,
        limit: 5,
        order: [ [ 'createdAt', 'DESC' ]],
        include: [
          {
            model: Song
          }
        ]
      }).map(history => history.toJSON())
        .map(history => _.extend({
          historyId: history.id
        }, history.Song))
      res.send(_.uniqBy(historys, 'title'))

    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: `Error occured while fetching historys: ${err}`
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      console.log('post: ', songId, songId)
      const res_history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(res_history)
    } catch (err) {
      res.status(500).send({
        error: `Error occured while creating history: ${err}`
      })
    }
  }
}
