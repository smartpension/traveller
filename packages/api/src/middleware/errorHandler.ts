import type { Request, Response, NextFunction } from 'express'
import type { HttpError } from 'src/common'

export const errorHandler = (httpError: HttpError, _req: Request, res: Response, _next: NextFunction): void => {
  const status = httpError.statusCode || 500
  const message = httpError.message
  res.status(status).send({ status, message })
}
