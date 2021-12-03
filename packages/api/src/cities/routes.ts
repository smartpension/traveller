import type { Request } from 'express'
import express from 'express'
import type { CitiesParams } from './types'
import { citiesService } from './service'
import { HttpError } from '../common'
import { paramToNumber, paramToBoolean } from '../utils'
export const citiesRouter = express.Router()

citiesRouter.get('/', (req: Request<unknown, unknown, unknown, CitiesParams>, res) => {
  const { offset, limit, visited, wishlist, id, ...restParams } = req.query

  const { cities, total } = citiesService.getAll(
    {
      visited: paramToBoolean(visited),
      wishlist: paramToBoolean(wishlist),
      id: paramToNumber(id),
      ...restParams,
    },
    paramToNumber(limit),
    paramToNumber(offset)
  )

  res.send({ cities, total })
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
