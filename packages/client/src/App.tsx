import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  Grid,
  InputRightElement,
  Input,
  Heading,
  theme,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center">
      <Grid minH="100vh" p={3} gridTemplateRows="auto auto 1fr">
        <ColorModeSwitcher justifySelf="flex-end" />
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
);
