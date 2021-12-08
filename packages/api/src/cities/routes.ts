import type { Request } from 'express'
import express from 'express'
import type { CitiesParams } from './types'
import { citiesService } from './service'
import { HttpError } from '../common'
import { paramToNumber, paramToBoolean } from '../utils'
export const citiesRouter = express.Router()

citiesRouter.get('/', (req: Request<unknown, unknown, unknown, CitiesParams>, res) => {
  /*	#swagger.responses[200] = {
    schema: { $ref: "#/definitions/Cities" }
  } */
  const { offset, limit, visited, wishlist, id, name, country } = req.query

  const { cities, total } = citiesService.getAll(
    {
      visited: paramToBoolean(visited),
      wishlist: paramToBoolean(wishlist),
      id: paramToNumber(id),
      name,
      country,
    },
    paramToNumber(limit),
    paramToNumber(offset)
  )

  res.send({ cities, total })
})

citiesRouter.get('/:cityId', (req, res) => {
  /*	#swagger.responses[200] = {
    schema: { $ref: "#/definitions/City" }
  } */
  const city = citiesService.get(req.params.cityId)
  if (city) return res.send(city)

  throw new HttpError(404, 'Resource not found')
})

citiesRouter.put('/:cityId', (req, res) => {
  /*	#swagger.parameters['body'] = {
    in: 'body',
    description: 'City properties to be updated',
    required: true,
    schema: { 
      visited: false,
      wishlist: true,
     }
  } */

  const updatedCity = citiesService.update(req.params.cityId, req.body)
  if (updatedCity) return res.send(updatedCity)

  throw new HttpError(404, 'Resource not found')
})
