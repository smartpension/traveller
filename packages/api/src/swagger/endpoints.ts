import { citiesRouter } from '../cities/routes'
import { app } from '../index'

export const endpoints = (): void => {
  app.use('/rest/cities', citiesRouter)
}
