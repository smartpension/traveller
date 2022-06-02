import React, { useContext } from 'react'
import type { FC } from 'react'
import { Checkbox } from '@chakra-ui/react'

import { updateCitiesArray } from './utils'
import { CitiesContext } from './cities.context'
import { City } from '../../api/src/cities/types'

interface Props {
  city: City
  attrToChange: 'visited' | 'wishlist'
}

const CustomCheckbox: FC<Props> = ({ city, attrToChange }) => {
  const { displayedCities, setDisplayedCities } = useContext(CitiesContext)

  const updateDisplayedCity = (cityToUpdate: City) => {
    const updatedCities = updateCitiesArray(displayedCities, cityToUpdate)
    setDisplayedCities(updatedCities)
  }

  const isChecked = city[attrToChange]
  return (
    <Checkbox isChecked={isChecked} onChange={() => updateDisplayedCity({ ...city, [attrToChange]: !isChecked })} />
  )
}

export default CustomCheckbox
