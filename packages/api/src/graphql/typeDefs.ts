import { gql } from 'apollo-server'

export const typeDefs = gql`
  type City {
    name: String
    country: String
    visited: Boolean
    wantToVisit: Boolean
  }

  type Query {
    cities(name: String, country: String, visited: Boolean, wantToVisit: Boolean): [City]
  }
`
