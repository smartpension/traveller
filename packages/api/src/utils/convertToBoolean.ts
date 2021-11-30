export const convertToBoolean = (val: string | boolean): boolean => {
  return typeof val === 'string' ? val === 'true' : val
}
