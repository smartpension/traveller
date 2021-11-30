import type { Request } from 'express'
import express from 'express'
import type { City } from './types'
import { citiesService } from './service'
import { HttpError } from '../common'

export const citiesRouter = express.Router()

citiesRouter.get('/', (req: Request<unknown, unknown, unknown, Partial<City>>, res) => {
  res.send(citiesService.getAll(req.query))
})

citiesRouter.get('/:cityId', (req, res) => {
  const city = citiesService.get(req.params.cityId)
  if (city) return res.send(city)

  throw new HttpError(404, 'Resource not found')
})

citiesRouter.put('/:cityId', (req, res) => {
  const updatedCity = citiesService.update(req.params.cityId, req.body)
  if (updatedCity) return res.send(updatedCity)

  throw new HttpError(404, 'Resource not found')
})
