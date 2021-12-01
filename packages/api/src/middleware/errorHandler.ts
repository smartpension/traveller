import type { Request, Response, NextFunction } from 'express'
import type { HttpError } from 'src/common'

export const errorHandler = (
  { statusCode, message }: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const status = statusCode || 500
  res.status(status).send({ status, message })
}
