import React from 'react'
import type { FC } from 'react'
import {
  ChakraProvider,
  Box,
  Container,
  Grid,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  extendTheme,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { TopBar } from './TopBar'

const fonts = {
  heading:
    '"Museo Sans", museo-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Lato", lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // chakra default
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

export const App: FC = () => (
  <ChakraProvider theme={extendTheme({ fonts })}>
    <Box textAlign="center">
      <Grid minH="100vh" gridTemplateRows="auto auto 1fr">
        <TopBar />
        <Heading as="h1">Smart traveler</Heading>
        <Container centerContent maxW="container.md" flexDir="row">
          <InputGroup>
            <Input />
            <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
          </InputGroup>
        </Container>
      </Grid>
    </Box>
  </ChakraProvider>
)
