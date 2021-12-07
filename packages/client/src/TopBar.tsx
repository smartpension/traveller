import React from 'react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Box, HStack, Image, useColorMode, Link as ChakraLink } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'

export const TopBar: FC = () => {
  const { colorMode } = useColorMode()
  const image = colorMode === 'light' ? 'smart-logo.svg' : 'smart-logo-contrast.svg'
  return (
    <Box
      as="nav"
      display="flex"
      alignItems="center"
      borderBottom="1px solid #E8E8E8"
      marginBottom="3rem"
      padding="0.5rem"
    >
      <Link to="/">
        <Image src={image} alt="smart logo" maxHeight="7" />
      </Link>

      <HStack justifyContent="right" width="100%">
        <ChakraLink as={Link} to="/">
          Home
        </ChakraLink>

        <ChakraLink as={Link} to="visited">
          Visited
        </ChakraLink>

        <ChakraLink as={Link} to="wish-list">
          Wish list
        </ChakraLink>
      </HStack>

      <ColorModeSwitcher justifySelf="flex-end" />
    </Box>
  )
}
