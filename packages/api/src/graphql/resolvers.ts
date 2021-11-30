import type { City } from '../data/cities'
import { isDefined } from '../utils/isDefined'
import { citiesService } from '../cities/service'

type UpdateCityArgs = Partial<Pick<City, 'visited' | 'wantToVisit'>> & Pick<City, 'id'>

export const resolvers = {
  Query: {
    // @TODO: add single city resolver
    cities: (_: undefined, { id, country, name, visited, wantToVisit }: City): City[] => {
      return citiesService.getAll({ id, country, name, visited, wantToVisit })
    },
  },

  Mutation: {
    updateCity: (_, { id, visited, wantToVisit }: UpdateCityArgs): City => {
      const fieldsToUpdate: Partial<City> = isDefined(visited) ? { visited } : {}
      isDefined(wantToVisit) && Object.assign(fieldsToUpdate, { wantToVisit })
      const updatedCity = citiesService.update(id, fieldsToUpdate)

      if (!updatedCity) throw new Error(`Cannot find a city of id: ${id}`)

      return updatedCity
    },
  },
}
