import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'

export const WishList: FC = () => (
  <>
    <Heading as="h1">Wish List</Heading>
    <Container centerContent maxW="container.md" flexDir="row"></Container>
  </>
)
