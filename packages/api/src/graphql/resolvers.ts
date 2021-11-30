import type { City } from '../data/cities'
import { cities } from '../data/cities'
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
      const targetCity = cities.find(city => city.id === id)

      if (!targetCity) {
        throw new Error(`Cannot find a city of id: ${id}`)
      }

      isDefined(visited) && Object.assign(targetCity, { visited })
      isDefined(wantToVisit) && Object.assign(targetCity, { wantToVisit })

      return targetCity
    },
  },
}
