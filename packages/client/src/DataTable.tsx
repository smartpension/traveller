import React, { FC, useContext, useEffect, useState } from 'react'
import { Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react'

import { putCitiesRequest } from './fetchApi'
import CustomCheckbox from './CustomCheckbox'
import { CitiesContext } from './cities.context'
import { City } from '../../api/src/cities/types'
import { mergeCityArrays, updateCitiesArray } from './utils'

interface IDataTable {
  filteredCities: City[]
}

const DataTable: FC<IDataTable> = ({ filteredCities }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const { cities, displayedCities, setCities, setDisplayedCities } = useContext(CitiesContext)

  const cleanUp = useEffect(() => {
    const mergeFilteredAndDisplayed = mergeCityArrays(filteredCities, displayedCities)
    setDisplayedCities(mergeFilteredAndDisplayed)

    // cleanup function: avoid memory leaks
    return () => {
      setIsUpdating(false)
    }
  }, [filteredCities])

  const updateCity = (cityToUpdate: City) => {
    const { id, visited, wishlist } = cityToUpdate
    setIsUpdating(true)
    putCitiesRequest(id, visited, wishlist)
      .then(_data => {
        const updatedCities = updateCitiesArray(cities, cityToUpdate)
        setCities(updatedCities)
      })
      .catch(error => console.log(error))
      .finally(() => setIsUpdating(false))
  }

  // this needs to be memoised:
  const displayedCityMatchesCityInArray = (displayedCity: City) => {
    const cityFromArray = cities.find(city => city.id === displayedCity.id)!
    return displayedCity.visited === cityFromArray.visited && displayedCity.wishlist === cityFromArray.wishlist
  }

  const tableBody = displayedCities.map(city => {
    const { id, name, country, visited, wishlist } = city
    const displayedCityIsNotModified = displayedCityMatchesCityInArray(city)
    return (
      <Tr key={id}>
        <Td>{name}</Td>
        <Td>{country}</Td>
        <Td>
          <CustomCheckbox city={city} attrToChange={'visited'} />
        </Td>
        <Td>
          <CustomCheckbox city={city} attrToChange={'wishlist'} />
        </Td>
        <Td>
          <Button onClick={() => updateCity(city)} disabled={displayedCityIsNotModified} isLoading={isUpdating}>
            Save
          </Button>
        </Td>
      </Tr>
    )
  })

  return (
    <TableContainer>
      <Table variant="simple" disabled={true}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Country</Th>
            <Th>Visited</Th>
            <Th>Whishlist</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>{tableBody}</Tbody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
