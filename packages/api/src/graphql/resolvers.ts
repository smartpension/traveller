import { cities, City } from '../data/cities'
import { isDefined } from '../utils/isDefined'

const idFilter = (id: number, city: City) => {
  return id ? city.id === id : true
}

const nameFilter = (name: string, city: City) => {
  return name ? city.name.toLowerCase().includes(name.toLowerCase()) : true
}

const countryFilter = (country: string, city: City) => {
  return country ? city.country.toLowerCase().includes(country.toLowerCase()) : true
}

const visitedFilter = (visited: boolean, city: City) => {
 return isDefined(visited) ? city.visited === visited : true
}

const wantToVisitFilter = (wantToVisit: boolean, city: City) => {
 return isDefined(wantToVisit) ? city.wantToVisit === wantToVisit : true
}

type UpdateCityArgs = Partial<Pick<City, "visited" | "wantToVisit">> & Pick<City, "id">

export const resolvers = {
  Query: {
    cities: (_: undefined, { id, country, name, visited, wantToVisit }: City): City[] => {
      return cities.filter(city => {
        return (
          idFilter(id, city) &&
          nameFilter(name, city) &&
          visitedFilter(visited, city) &&
          wantToVisitFilter(wantToVisit, city) &&
          countryFilter(country, city)
        )
      })
    },
  },

  Mutation: {
    updateCity: (_, { id, visited, wantToVisit }: UpdateCityArgs) => {
      const targetCity = cities.find(city => city.id === id)

      if (!targetCity) {
        throw new Error(`Cannot find a city of id: ${id}`)
      }

      isDefined(visited) && Object.assign(targetCity, { visited })
      isDefined(wantToVisit) && Object.assign(targetCity, { wantToVisit })

      return targetCity
    }
  },
};
