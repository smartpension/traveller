import { searchQuery } from '../graph-helper'

export const mockGraphQlWithRows = [
  {
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
  },
  {
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
  },
]

export const mockGraphQlEmpty = [
  {
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
  },
]

export const mockGraphQlError = [
  {
    request: {
      query: searchQuery,
      variables: {
        filter: { name: '' },
      },
    },
    error: 'Server related',
  },
]
