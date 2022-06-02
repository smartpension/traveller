import type { FC } from 'react'
import { ListItem, UnorderedList } from '@chakra-ui/react'
import { ICities } from './interfaces'

const CitiesList: FC<ICities> = ({ cities }) => (
  <UnorderedList>
    {cities.map(({ id, name, country }) => (
      <ListItem key={id}>{`${name}, ${country}`}</ListItem>
    ))}
  </UnorderedList>
)

export default CitiesList
