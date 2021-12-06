import type { City } from '../cities/types'

export const paginate = (cities: City[], limit: number | undefined, offset: number): City[] => {
  if (!limit && offset === 0) return cities

  const end = limit ? limit + offset : undefined

  return cities.slice(offset, end)
}
