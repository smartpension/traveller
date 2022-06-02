import { City } from '../../api/src/cities/types'
import { getPutRequestOptions } from './utils'

const BASE_URL = 'http://localhost:4000/rest'

export const getCitiesRequest = () =>
  fetch(`${BASE_URL}/cities`).then((response: Response) =>
    response.ok ? response.json() : new Error('error at fetching all cities')
  )

export const putCitiesRequest = (id: City['id'], visited: City['visited'], wishlist: City['wishlist']) =>
  fetch(`${BASE_URL}/cities/${id}`, getPutRequestOptions(visited, wishlist)).then((response: Response) =>
    response.ok ? response.json() : new Error('error at fetching all cities')
  )
