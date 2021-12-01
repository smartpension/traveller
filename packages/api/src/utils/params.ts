import { HttpError } from '../common'
import { isDefined } from '.'

export const paramToNumber = (value: string | number | undefined): number | undefined => {
  if (!value) return undefined

  if (typeof value === 'number') return value

  const num = parseInt(value)

  if (isNaN(num)) {
    throw new HttpError(422, `param ${value} is invalid`)
  }
  return num
}

export const paramToBoolean = (value: string | undefined): boolean | undefined => {
  if (!value) return undefined

  if (typeof value === 'boolean') return value

  const dict = {
    false: false,
    true: true,
  }

  if (!isDefined(dict[value])) {
    throw new HttpError(422, `param ${value} is invalid`)
  }

  return dict[value]
}
