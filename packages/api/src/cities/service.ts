import type { CitiesResult, City } from './types'
import { cities } from '../data/cities'
import { isDefined, paginate } from '../utils'

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
  return isDefined(visited) ? city.visited === visited : true
}

const wishlistFilter = (city: City, wishlist?: boolean | string) => {
  return isDefined(wishlist) ? city.wishlist === wishlist : true
}

const getAll = (
  { id, name, visited, wishlist, country }: Partial<City>,
  limit: number | undefined,
  offset = 0
): CitiesResult => {
  const data = cities.filter(city => {
    return (
      idFilter(city, id) &&
      nameFilter(city, name) &&
      visitedFilter(city, visited) &&
      wishlistFilter(city, wishlist) &&
      countryFilter(city, country)
    )
  })

  return {
    total: data.length,
    cities: paginate(data, limit, offset),
  }
}

const get = (id: string | number): City | undefined => {
  return cities.find(city => id.toString() === city.id.toString())
}

export const update = (id: string | number, updatedFields: Partial<City>): City | undefined => {
  const city = get(id)
  if (!city) return

  const updatedCity = Object.assign(city, updatedFields)
  return updatedCity
}

export const citiesService = {
  getAll,
  get,
  update,
}
