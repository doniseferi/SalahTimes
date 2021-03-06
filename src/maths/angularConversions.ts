import { ErrorOr, failure, success } from '../either'
import { AngularDegrees, degrees } from '.'

const angularConst = 0.017453292519943295769236907684888

const radiansToAngularDegrees = (radians: number): ErrorOr< AngularDegrees> => degrees(radians / angularConst)

const angularDegreesToRadians = (degrees: Readonly<AngularDegrees>): ErrorOr<number> =>
  (degrees !== null && degrees.value !== null) 
  ? success(degrees.value * angularConst)
  : failure(new Error('degrees is null or undefined.')) 

const radiansToAngularDegreesNumericConversion = (radians: number): number => radians / angularConst

const angularDegreesToRadiansNumericConversion = (degrees: number): number => degrees * angularConst

export {
  angularConst,
  radiansToAngularDegrees,
  angularDegreesToRadians,
  radiansToAngularDegreesNumericConversion,
  angularDegreesToRadiansNumericConversion
}
