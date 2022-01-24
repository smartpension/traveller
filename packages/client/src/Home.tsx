import React, { useState } from 'react'
import type { FC } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { useLazyQuery } from '@apollo/client'
import { City, searchQuery } from './graph-helper'

export const Home: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [doSearch, { loading, error, data }] = useLazyQuery(searchQuery)

  const getCities = (): City[] => {
    if (data === null || data === undefined || data.cities === null || data.cities === undefined) {
      return []
    }

    return data.cities.cities
  }

  const handleChangeSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSearch = () => {
    doSearch({ variables: { filter: { name: searchTerm } } })
  }

  console.log('}} ', loading)

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <VStack spacing="30">
          {loading ? (
            <Spinner data-test-id="spinner" />
          ) : (
            <>
              <InputGroup>
                <Input value={searchTerm} onChange={handleChangeSearchTerm} />
                <InputRightElement
                  children={<IconButton aria-label="Search" icon={<Search2Icon />} />}
                  onClick={handleSearch}
                />
              </InputGroup>
              <Table variant="simple">
                <TableCaption>Search results</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Country</Th>
                    <Th>Visited</Th>
                    <Th>Wishlist</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {getCities().map((city: City) => (
                    <Tr key={city.id}>
                      <Td>{city.name}</Td>
                      <Td>{city.country}</Td>
                      <Td>
                        <Checkbox checked={city.visited} />
                      </Td>
                      <Td>
                        <Checkbox checked={city.wishlist} />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </>
          )}

          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error</AlertTitle>
              <AlertDescription>Unable to perform the search</AlertDescription>
              <CloseButton position="absolute" right="8px" top="8px" />
            </Alert>
          )}
        </VStack>
      </Container>
    </VStack>
  )
}
