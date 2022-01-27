import React from 'react'
import type { FC } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Heading,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { City, searchQuery } from './graph-helper'
import { useQuery } from '@apollo/client'

export const WishList: FC = () => {
  const { loading, error, data } = useQuery(searchQuery, {
    variables: { filter: { wishlist: true } },
    pollInterval: 500,
  })

  const getCities = (): City[] => {
    if (data === null || data === undefined || data.cities === null || data.cities === undefined) {
      return []
    }

    return data.cities.cities
  }
  return (
    <>
      <Heading as="h1">Wish list</Heading>
      <Container centerContent maxW="container.md" flexDir="row">
        {loading ? (
          <Spinner data-testid="spinner" />
        ) : (
          <Table variant="simple">
            <TableCaption>Visited cities</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Country</Th>
              </Tr>
            </Thead>
            <Tbody>
              {getCities().map((city: City) => (
                <Tr key={city.id} data-testid={city.id}>
                  <Td>{city.name}</Td>
                  <Td>{city.country}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>Unable to get the cities</AlertDescription>
          </Alert>
        )}
      </Container>
    </>
  )
}
