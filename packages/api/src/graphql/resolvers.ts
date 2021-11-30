import type { City } from '../cities/types'
import { citiesService } from '../cities/service'
import { isDefined } from '../utils'

type UpdateCityArgs = Partial<Pick<City, 'visited' | 'wishlist'>> & Pick<City, 'id'>

export const resolvers = {
  Query: {
    // @TODO: add single city resolver
    cities: (_: undefined, { id, country, name, visited, wishlist }: City): City[] => {
      return citiesService.getAll({ id, country, name, visited, wishlist })
    },
    city: (_: undefined, { id }: City): City | undefined => {
      return citiesService.get(id)
    },
  },

  Mutation: {
    updateCity: (_: undefined, { id, visited, wishlist }: UpdateCityArgs): City => {
      const fieldsToUpdate: Partial<City> = isDefined(visited) ? { visited } : {}
      isDefined(wishlist) && Object.assign(fieldsToUpdate, { wishlist })
      const updatedCity = citiesService.update(id, fieldsToUpdate)

      if (!updatedCity) throw new Error(`Cannot find a city of id: ${id}`)

      return updatedCity
    },
  },
}
