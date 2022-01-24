import { Container, Heading, VStack } from '@chakra-ui/react'
import type { FC } from 'react'
import React, { useState } from 'react'
import FormInput from './FormInput'

export const Home: FC = () => {
  const [address, setAddress] = useState()

  const handleSubmit = (e: any) => {
    
    console.log(e.target[0].value)
    e.preventDefault()
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <FormInput onSubmit={handleSubmit} />
      </Container>
    </VStack>
  )
}
