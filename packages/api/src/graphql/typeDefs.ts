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

  type Query {
    cities(filter: CitiesFilters): [City]
    city(id: Int): City
  }

  type Mutation {
    updateCity(input: CitiesMutationInput): City
  }
`
