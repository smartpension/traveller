import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import type { Request } from 'express'
import express from 'express'
import http from 'http'
import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { citiesService } from './cities/service'
import type { City } from './data/cities'

async function startApolloServer(typeDefs, resolvers) {
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

  app.get('/rest/cities', (req: Request<unknown, unknown, unknown, Partial<City>>, res) => {
    res.send(citiesService.getAll(req.query))
  })

  app.get('/rest/cities/:cityId', (req, res) => {
    const city = citiesService.find(req.params.cityId)
    if (city) return res.send(city)

    // @TODO: would be nice to have some better error handling instead of inline object like this
    res.status(404).send({ status: 404, message: 'Not found' })
  })

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
