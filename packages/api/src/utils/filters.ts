import type { City } from '../types/cities'
import { isDefined } from './isDefined'

export const idMatcher = (id: number, city: City): boolean => {
  return id ? city.id === id : true
}

export const nameMatcher = (name: string, city: City): boolean => {
  return name ? city.name.toLowerCase().includes(name.toLowerCase()) : true
}

export const countryMatcher = (country: string, city: City): boolean => {
  return country ? city.country.toLowerCase().includes(country.toLowerCase()) : true
}

export const visitedMatcher = (visited: boolean, city: City): boolean => {
  return isDefined(visited) ? city.visited === visited : true
}

export const wishlistMatcher = (wishlist: boolean, city: City): boolean => {
  return isDefined(wishlist) ? city.wishlist === wishlist : true
}
