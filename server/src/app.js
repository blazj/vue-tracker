console.log('Hello server here!')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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

app.get('/status', (req, res) => {
  res.send({
    message: 'hello world'
  })
})

app.listen(process.env.PORT || 8081)
