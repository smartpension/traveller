import { gql } from '@apollo/client'

export const searchQuery = gql`
  query CitiesQuery($filter: CitiesFilters!) {
    cities(filter: $filter) {
      cities {
        id
        name
        visited
        wishlist
        country
      }
    }
  }
`

export const cityMutation = gql`
  mutation updateCity($citiesInput: CitiesMutationInput!) {
    updateCity(input: $citiesInput) {
      id
      name
      country
      visited
      wishlist
    }
  }
`

export interface City {
  id: number
  name: string
  visited: boolean
  wishlist: boolean
  country: string
}

export interface CityData {
  cities: City[]
}

export interface CityFilter {
  name: string
}

export interface CitiesMutationInput {
  id: number
  visited: boolean
  wishlist: boolean
}
