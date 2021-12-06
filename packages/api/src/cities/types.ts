export type City = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type CitiesArgs = {
  filter?: Partial<City> & { id: string }
  limit?: number
  offset?: number
}

export type CitiesParams = Partial<Record<keyof City, string>> & { limit?: string; offset?: string }
export type UpdateCityArgs = { input: Partial<Pick<City, 'visited' | 'wishlist'>> & Pick<City, 'id'> }
export type CityArgs = Pick<City, 'id'>

export type CitiesResult = {
  cities: City[]
  total: number
}
