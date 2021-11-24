import type { City } from '../data/cities'
import { cities } from '../data/cities'

const nameFilter = (name: string, city: City) => {
  return name ? city.name.toLowerCase().includes(name.toLowerCase()) : true
}

const countryFilter = (country: string, city: City) => {
  return country ? city.country.toLowerCase().includes(country.toLowerCase()) : true
}

const visitedFilter = (visited: boolean, city: City) => {
  return visited !== undefined ? city.visited === visited : true
}

const wantToVisitFilter = (wantToVisit: boolean, city: City) => {
  return wantToVisit !== undefined ? city.wantToVisit === wantToVisit : true
}

export const resolvers = {
  Query: {
    cities: (_: undefined, { name, visited, wantToVisit, country }: City): City[] => {
      return cities.filter(city => {
        return (
          nameFilter(name, city) &&
          visitedFilter(visited, city) &&
          wantToVisitFilter(wantToVisit, city) &&
          countryFilter(country, city)
        )
      })
    },
  },
}
