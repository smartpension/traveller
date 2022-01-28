import { MockedResponse } from '@apollo/client/testing'
import { searchQuery, cityMutation } from '../graph-helper'

export const mockGraphQlWithRows: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { name: '' },
    },
  },
  result: {
    data: {
      cities: {
        cities: [
          {
            id: 64,
            name: 'Frankfurt am Main',
            visited: false,
            wishlist: false,
            country: 'Germany',
          },
          { id: 332, name: 'Freiburg', visited: false, wishlist: false, country: 'Germany' },
          {
            id: 352,
            name: 'Jerez de la Frontera',
            visited: false,
            wishlist: false,
            country: 'Spain',
          },
          {
            id: 358,
            name: 'Ivano-Frankivsk',
            visited: false,
            wishlist: false,
            country: 'Ukraine',
          },
        ],
      },
    },
  },
}

export const mockGraphQlFilteredWithRows: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { name: 'Fra' },
    },
  },
  result: {
    data: {
      cities: {
        cities: [
          {
            id: 64,
            name: 'Frankfurt am Main',
            visited: false,
            wishlist: false,
            country: 'Germany',
          },
          { id: 332, name: 'Freiburg', visited: false, wishlist: false, country: 'Germany' },
          {
            id: 352,
            name: 'Jerez de la Frontera',
            visited: false,
            wishlist: false,
            country: 'Spain',
          },
        ],
      },
    },
  },
}

export const mockGraphQlEmpty: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { name: '' },
    },
  },
  result: {
    data: {
      cities: {
        cities: [],
      },
    },
  },
}

export const mockGraphQlError: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { name: '' },
    },
  },
  error: new Error('Server related'),
}

export const getGraphQlMutation = (doMutationCallback: Function): MockedResponse => {
  return {
    request: {
      query: cityMutation,
      variables: {
        citiesInput: { id: 332, visited: true },
      },
    },
    result: () => {
      doMutationCallback()
      return {
        data: {
          updateCity: {
            id: 332,
            name: 'Frankfurt am Main',
            visited: false,
            wishlist: false,
            country: 'Germany',
          },
        },
      }
    },
  }
}

export const getGraphQlMutationError: MockedResponse = {
  request: {
    query: cityMutation,
    variables: {
      citiesInput: { id: 332, visited: true },
    },
  },
  error: new Error('Server related'),
}
