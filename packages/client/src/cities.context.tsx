import { FC, createContext, useState } from 'react'
import { City } from '../../api/src/cities/types'

interface ICitiesContext {
  cities: City[]
  filter: string
  displayedCities: City[]
  setCities: (cities: City[]) => void
  setFilter: (filter: string) => void
  setDisplayedCities: (cities: City[]) => void
}

export const CitiesContext = createContext<ICitiesContext>({
  cities: [],
  filter: '',
  displayedCities: [],
  setCities: () => null,
  setFilter: () => null,
  setDisplayedCities: () => null,
})

export const CitiesProvider: FC = ({ children }) => {
  const [cities, setCities] = useState<City[]>([])
  const [filter, setFilter] = useState<string>('')
  const [displayedCities, setDisplayedCities] = useState<City[]>([])
  const value = { cities, filter, displayedCities, setCities, setFilter, setDisplayedCities }
  return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
}
