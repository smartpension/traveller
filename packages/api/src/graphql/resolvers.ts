import type { City, CitiesArgs } from '../cities/types'
import { citiesService } from '../cities/service'
import { isDefined } from '../utils'
import { HttpQueryError } from 'apollo-server-core'

type UpdateCityArgs = { input: Partial<Pick<City, 'visited' | 'wishlist'>> & Pick<City, 'id'> }
type CityArgs = Pick<City, 'id'>

export const resolvers = {
  Query: {
    cities: (_: undefined, { filter, limit, offset }: CitiesArgs): City[] => {
      const { id, country, name, visited, wishlist } = filter ?? {}

      const cities = citiesService.getAll({ id, country, name, visited, wishlist })

      return citiesService.paginate(cities, limit, offset)
    },

    city: (_: undefined, { id }: CityArgs): City => {
      const city = citiesService.get(id)

      if (!city) throw new HttpQueryError(404, `A city with id: ${id} could not be found`)

      return city
    },
  },

  Mutation: {
    updateCity: (_: undefined, { input: { id, visited, wishlist } }: UpdateCityArgs): City => {
      const fieldsToUpdate: Partial<City> = isDefined(visited) ? { visited } : {}
      isDefined(wishlist) && Object.assign(fieldsToUpdate, { wishlist })
      const updatedCity = citiesService.update(id, fieldsToUpdate)

      if (!updatedCity) throw new HttpQueryError(404, `A city with id: ${id} could not be found`)

      return updatedCity
    },
  },
}
