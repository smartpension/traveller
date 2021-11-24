import { gql } from 'apollo-server'

export const typeDefs = gql`
  type City {
    id: Int
    name: String
    country: String
    visited: Boolean
    wantToVisit: Boolean
  }

  type Query {
    cities(name: String, country: String, visited: Boolean, wantToVisit: Boolean, id: Int): [City]
  }

  type Mutation {
    updateCity(id: Int, visited: Boolean, wantToVisit: Boolean): City
  }
`
