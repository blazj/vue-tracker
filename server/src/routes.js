const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistorysController = require('./controllers/HistorysController')
const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const isAuthenticated = require('./policies/isAuthenticated')

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'hello world'
    })
  })
  // Construct a schema, using GraphQL schema language
  const schema = buildSchema(`
    type Query {
      hello: String
    }
  `)
  // The root provides a resolver function for each API endpoint
  const root = {
    hello: () => {
      return 'Hello world!'
    }
  }
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }))
  // Post using a seperate conntrollers file
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)
  app.post('/login',
    AuthenticationController.login)

  app.get('/songs',
    SongsController.index)
  app.get('/songs/:songId',
    SongsController.show)
  app.delete('/songs/:songId',
    SongsController.delete)
  app.put('/songs/:songId',
    SongsController.put)
  app.post('/songs',
    SongsController.create)

  app.get('/bookmarks',
    isAuthenticated,
    BookmarksController.index)
  app.post('/bookmarks',
    isAuthenticated,
    BookmarksController.post)
  app.delete('/bookmarks/:bookmarkId',
    isAuthenticated,
    BookmarksController.delete)

  app.get('/historys',
    isAuthenticated,
    HistorysController.index)
  app.post('/historys',
    isAuthenticated,
    HistorysController.post)
}
