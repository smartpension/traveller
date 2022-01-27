import { MockedResponse } from '@apollo/client/testing'
import { searchQuery, cityMutation } from '../graph-helper'

export const mockGraphQlWishListWithRows: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { wishlist: true },
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
            wishlist: true,
            country: 'Germany',
          },
          { id: 332, name: 'Freiburg', visited: true, wishlist: true, country: 'Germany' },
        ],
      },
    },
  },
}

export const mockGraphQlWishListEmpty: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { wishlist: true },
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

export const mockGraphQlWishListError: MockedResponse = {
  request: {
    query: searchQuery,
    variables: {
      filter: { wishlist: true },
    },
  },
  error: new Error('Server related'),
}

export const getGraphQlWishListMutation = (doMutationCallback: Function): MockedResponse => {
  return {
    request: {
      query: cityMutation,
      variables: {
        citiesInput: { id: 64, wishlist: true },
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
            wishlist: true,
            country: 'Germany',
          },
        },
      }
    },
  }
}
