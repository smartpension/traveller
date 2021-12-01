import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { citiesRouter } from './cities/routes'
import { errorHandler } from './middleware/errorHandler'
import { getEndpointInfoHTML } from './utils'
import cors from 'cors'

async function startApolloServer(typeDefs, resolvers) {
  const PORT = 4000
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
  })

  app.use(cors())
  app.use(express.json())
  app.use('/rest/cities', citiesRouter)
  app.use('/rest', (_, res) => {
    res.send(getEndpointInfoHTML(app))
  })
  app.use(errorHandler)

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 REST Server ready at http://localhost:${PORT}/rest`)
}

startApolloServer(typeDefs, resolvers)
