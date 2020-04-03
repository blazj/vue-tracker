const { Song } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async index (req, res) {
    try {
      let song = null
      const search = req.query.search
      console.log(search)
      if (search) {
        song = await Song.findAll({
          where: {
            [Op.or]: [
              { title: { [Op.like]: '%' + search + '%' } },
              { artist: { [Op.like]: '%' + search + '%' } },
              { album: { [Op.like]: '%' + search + '%' } },
              { genre: { [Op.like]: '%' + search + '%' } }
            ]
          }
        })
      } else {
        song = await Song.findAll({
          limit: 10
        })
      }
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: `Error occured while fetching songs. ${err}`
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'Error occured while fetching song.'
      })
    }
  },
  async create (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'Error occured while creating the song.'
      })
    }
  },
  async put (req, res) {
    try {
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'Error occured while updating the song.'
      })
    }
  },
  async delete (req, res) {
    try {
      await Song.destroy({
        where: {
          id: req.params.songId
        }
      }).then(function (rowDeleted) {
        if (rowDeleted === 1) {
          console.log('Deleted successfully')
        }
      })
    } catch (err) {
      res.status(500).send({
        error: 'Error occured while deleting the song.'
      })
    }
  }
}
