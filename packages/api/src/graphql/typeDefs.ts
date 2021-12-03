import { gql } from 'apollo-server'

export const typeDefs = gql`
  type City {
    id: Int
    name: String
    country: String
    visited: Boolean
    wishlist: Boolean
  }

  input CitiesFilters {
    id: Int
    name: String
    country: String
    visited: Boolean
    wishlist: Boolean
  }

  input CitiesMutationInput {
    id: Int
    visited: Boolean
    wishlist: Boolean
  }

  type CitiesResult {
    cities: [City]
    total: Int
  }

  type Query {
    cities(filter: CitiesFilters, limit: Int, offset: Int): CitiesResult
    city(id: Int!): City
  }

  type Mutation {
    updateCity(input: CitiesMutationInput): City
  }
`
