import type { City } from '../data/cities'
import { cities } from '../data/cities'
import { isDefined } from '../utils/isDefined'
import { convertToBoolean } from '../utils/convertToBoolean'

const idFilter = (city: City, id?: number) => {
  return id ? city.id === id : true
}

const nameFilter = (city: City, name?: string) => {
  return name ? city.name.toLowerCase().includes(name.toLowerCase()) : true
}

const countryFilter = (city: City, country?: string) => {
  return country ? city.country.toLowerCase().includes(country.toLowerCase()) : true
}

const visitedFilter = (city: City, visited?: boolean | string) => {
  return isDefined(visited) ? city.visited === convertToBoolean(visited) : true
}

const wantToVisitFilter = (city: City, wantToVisit?: boolean | string) => {
  return isDefined(wantToVisit) ? city.wantToVisit === convertToBoolean(wantToVisit) : true
}

const getAll = ({ id, name, visited, wantToVisit, country }: Partial<City>): City[] => {
  return cities.filter(city => {
    return (
      idFilter(city, id) &&
      nameFilter(city, name) &&
      visitedFilter(city, visited) &&
      wantToVisitFilter(city, wantToVisit) &&
      countryFilter(city, country)
    )
  })
}

const find = (id: string): City | undefined => {
  return cities.find(city => id === city.id.toString())
}

export const citiesService = {
  getAll,
  find,
}
