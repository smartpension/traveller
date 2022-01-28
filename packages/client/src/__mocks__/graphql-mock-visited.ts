import { MockedResponse } from '@apollo/client/testing'
import { searchQuery, cityMutation } from '../graph-helper'

export const mockGraphQlVisitedWithRows: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { visited: true },
    },
  },
  result: {
    data: {
      cities: {
        cities: [
          {
            id: 64,
            name: 'Frankfurt am Main',
            visited: true,
            wishlist: false,
            country: 'Germany',
          },
          { id: 332, name: 'Freiburg', visited: true, wishlist: false, country: 'Germany' },
        ],
      },
    },
  },
}

export const mockGraphQlVisitedEmpty: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { visited: true },
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

export const mockGraphQlVisitedError: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { visited: true },
    },
  },
  error: new Error('Server related'),
}
