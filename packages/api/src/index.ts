import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger/output.json'
import { endpoints } from './swagger'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { errorHandler } from './middleware/errorHandler'
import cors from 'cors'

export const app = express()

async function startApolloServer(typeDefs, resolvers) {
  const PORT = 4000
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
  endpoints()
  app.use('/rest', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  app.use(errorHandler)

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 REST Server ready at http://localhost:${PORT}/rest`)
}

startApolloServer(typeDefs, resolvers)
