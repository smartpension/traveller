import { Search2Icon } from '@chakra-ui/icons'
import React, { ChangeEvent, useEffect, useContext, useState } from 'react'
import { Container, InputRightElement, Input, Heading, InputGroup, IconButton, VStack } from '@chakra-ui/react'

import type { FC } from 'react'
import DataTable from './DataTable'
import { properStr } from './utils'
import { ICities } from './interfaces'
import { CitiesContext } from './cities.context'

export const Home: FC<ICities> = ({ cities }) => {
  const [filteredCities, setFilteredCities] = useState<ICities['cities']>([])
  const { filter, setFilter } = useContext(CitiesContext)

  useEffect(() => {
    filterCities()
  }, [cities])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setFilter(event.target.value)

  const filterCities = () => {
    const citiesToSearchArray = filter.split(',').map(cityName => properStr(cityName))
    const filteredCities = cities.filter(({ name }) => citiesToSearchArray.includes(name))
    setFilteredCities(filteredCities)
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input
            placeholder="enter list of cities separated by commas"
            value={filter}
            aria-label="cities-input"
            onChange={event => handleChange(event)}
          />
          <InputRightElement
            children={<IconButton aria-label="search button" icon={<Search2Icon />} onClick={filterCities} />}
          />
        </InputGroup>
        {filteredCities.length > 0 && <DataTable filteredCities={filteredCities} />}
      </Container>
    </VStack>
  )
}
