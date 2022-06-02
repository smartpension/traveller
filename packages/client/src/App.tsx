import type { FC } from 'react'
import { useContext, useEffect } from 'react'
import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'

import { Home } from './Home'
import { TopBar } from './TopBar'
import { WishList } from './WishList'
import { Visited } from './Visited'
import { getCitiesRequest } from './fetchApi'
import { CitiesContext } from './cities.context'
import { City } from '../../api/src/cities/types'

const fonts = {
  heading:
    '"Museo Sans", museo-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  body: '"Lato", lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  // chakra default
  mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
}

export const App: FC = () => {
  const { cities, setCities } = useContext(CitiesContext)

  useEffect(() => {
    // Fetch all  cities using the REST Api. When finished, the whole data
    // is stored in the `cities` state that is made available to all other
    // components that require it via React.Context
    getCitiesRequest()
      .then((data: { cities: City[] }) => setCities(data.cities))
      .catch(error => console.log(error))
  }, [])

  return (
    <ChakraProvider theme={extendTheme({ fonts })}>
      <TopBar />
      <Box textAlign="center">
        <Routes>
          <Route index element={<Home cities={cities} />} />
          <Route path="wish-list" element={<WishList />} />
          <Route path="visited" element={<Visited />} />
        </Routes>
      </Box>
    </ChakraProvider>
  )
}
