import type { Request } from 'express'
import express from 'express'
import type { City } from './types'
import { citiesService } from './service'

export const citiesRouter = express.Router()

citiesRouter.get('/', (req: Request<unknown, unknown, unknown, Partial<City>>, res) => {
  res.send(citiesService.getAll(req.query))
})

citiesRouter.get('/:cityId', (req, res) => {
  const city = citiesService.get(req.params.cityId)
  if (city) return res.send(city)

  // @TODO: add better error handling instead of inline objects
  res.status(404).send({ status: 404, message: 'Not found' })
})

citiesRouter.put('/:cityId', (req, res) => {
  const updatedCity = citiesService.update(req.params.cityId, req.body)
  if (updatedCity) return res.send(updatedCity)

  // @TODO: add better error handling instead of inline objects
  res.status(404).send({ status: 404, message: 'Not found' })
})
