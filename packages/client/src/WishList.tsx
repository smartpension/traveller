import type { FC } from 'react'
import React, { useContext } from 'react'
import { Container, Heading } from '@chakra-ui/react'

import CitiesList from './CitiesList'
import { CitiesContext } from './cities.context'

export const WishList: FC = () => {
  const { cities } = useContext(CitiesContext)
  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        <CitiesList cities={cities.filter(city => city.wishlist)} />
      </Container>
    </>
  )
}
