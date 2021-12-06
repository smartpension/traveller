import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'

export const Visited: FC = () => (
  <>
    <Heading as="h1">Visited</Heading>
    <Container centerContent maxW="container.md" flexDir="row"></Container>
  </>
)
