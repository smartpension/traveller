import { City } from '../../api/src/cities/types'

export const BASE_URL = 'http://localhost:4000/rest'

export const getPutRequestOptions = (visited: boolean, wishlist: boolean) => ({
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ visited, wishlist }),
})

export const properStr = (stringToConvert: string): string => {
  if (stringToConvert.length) {
    stringToConvert = stringToConvert.trim().toLowerCase()
    const firstLetter = stringToConvert.charAt(0)
    return stringToConvert.replace(/^./, firstLetter.toUpperCase())
  }
  return stringToConvert
}

export const updateCitiesArray = (cities: City[], cityToUpdate: City) => {
  return cities.map(city => (city.id === cityToUpdate.id ? cityToUpdate : city))
}

// I really don't like this:
export const mergeCityArrays = (citiesArr1: City[], citiesArr2: City[]) => {
  let resultArray = [...citiesArr1]
  citiesArr2.forEach(city => {
    resultArray = updateCitiesArray(resultArray, city)
  })
  return resultArray
}
