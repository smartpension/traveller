export type City = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type CitiesArgs = {
  filter: City
  limit: number
  offset: number
}
