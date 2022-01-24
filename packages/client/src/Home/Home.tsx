import { Container, Heading, VStack } from '@chakra-ui/react'
import { FC, useEffect } from 'react'
import React, { useState } from 'react'
import FormInput from '../FormInput/FormInput'
import { useQuery } from '@apollo/client'

export const Home: FC = () => {
  const [address, setAddress] = useState()

  const handleSubmit = (e: any) => {
    setAddress(e.target[0].value)
    e.preventDefault()
  }

  useEffect(() => {
    if (address) {
      console.log(address)
      // const { loading, data, error } = useQuery();
    }
  }, [address])

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <FormInput onSubmit={handleSubmit} />
        <
      </Container>
    </VStack>
  )
}
