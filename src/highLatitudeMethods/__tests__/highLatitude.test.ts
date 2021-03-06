import { angleBasedMethod, oneSeventhMethod, middleOfTheNightMethod } from '../index'
import { timeSpan, TimeSpan } from '../../time'
import { degrees, AngularDegrees } from '../../maths'
import { throwOnError } from '../../either'
import {
  iterativeTest,
  randomTimeSpan,
  randomDegree,
  generateRandomWholeNumber
} from '../../testUtils'

describe('High latitude: Angle based method  pre conditions', () => {
  test('throws an error when the degree angle is null', () => {
    iterativeTest<AngularDegrees, void>({
      numberOfExecutions: 500,
      generateInput: () => null as unknown as AngularDegrees,
      assert: (val) => {
        expect(() => throwOnError(angleBasedMethod(val, randomTimeSpan()))).toThrowError()
      }
    })
  })
  test('throws an error when no time span is provided', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => null as unknown as TimeSpan,
      assert: (val) => {
        expect(() => throwOnError(angleBasedMethod((randomDegree()), val))).toThrowError(ReferenceError)
      }
    })
  })
  test('throws an error when the degree angle is 0.', () => {
    iterativeTest<AngularDegrees, void>({
      numberOfExecutions: 500,
      generateInput: () => throwOnError(degrees(0)),
      assert: (val) => {
        expect(() => throwOnError(angleBasedMethod(val, randomTimeSpan()))).toThrowError()
      }
    })
  })
})
describe('High latitude: Angle based method  invariance', () => {
  test('doesn\'t modify the degree object', () => {
    iterativeTest<AngularDegrees, void>({
      numberOfExecutions: 500,
      generateInput: () => randomDegree(1),
      assert: (val) => {
        const deepClone = throwOnError(degrees(val.value))
        angleBasedMethod(val, randomTimeSpan())
        expect(deepClone).toEqual(val)
      }
    })
  })
  test('doesn\'t modify the time span object', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: (val) => {
        const deepClone = val
        angleBasedMethod(randomDegree(1), val)
        expect(deepClone).toEqual(val)
      }
    })
  })
})
describe('High latitude calculation post conditions', () => {
  test('Angle based method The result will always equal the time span divided by the angle', () => {
    iterativeTest<HighLatitudeTestSpec, void>({
      numberOfExecutions: 500,
      generateInput: () => highLatitudeTestSpec(throwOnError(degrees(generateRandomWholeNumber(1, 90))), timeSpan(0, generateRandomWholeNumber(0, 23), 0, 0, 0)),
      assert: (val) => {
        const expected = ((val.timeSpanBetweenSunsetAndSunrise.value / 100) * ((val.angle / 60) * 100))
        const actual = val.actual
        expect(actual.value).toEqual(expected)
      }
    })
  })
  test('the result will always return a time span', () => {
    iterativeTest<HighLatitudeTestSpec, void>({
      numberOfExecutions: 500,
      generateInput: () =>
        highLatitudeTestSpec(
          throwOnError(degrees(generateRandomWholeNumber(1, 90))),
          timeSpan(0, generateRandomWholeNumber(0, 23), 0, 0, 0)
        ),
      assert: testData => {
        expect(testData.actual as TimeSpan).not.toBeNull()
      }
    })
  })
})

describe('High latitude: One seventh method pre conditions', () => {
  test('throws an error when no time span is null', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => (null as unknown) as TimeSpan,
      assert: val => {
        expect(() => throwOnError(oneSeventhMethod(val))).toThrowError()
      }
    })
  })
  test('throws an error when no time span is undefined', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => undefined as unknown as TimeSpan,
      assert: val => {
        expect(() => throwOnError(oneSeventhMethod(val))).toThrowError()
      }
    })
  })
})

describe('High latitude: One seventh based method invariance', () => {
  test('doesn\'t modify the passed in time span object', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: (val) => {
        const deepClone = val
        oneSeventhMethod(val)
        expect(deepClone).toEqual(val)
      }
    })
  })
})
describe('High latitude: One seventh based method  post conditions', () => {
  test('The result will always equal the time span divided by 7', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: val => {
        const expected = (val.value / 7) >> 0
        const actual = throwOnError(oneSeventhMethod(val)).value
        expect(actual).toEqual(expected)
      }
    })
  })
  test('the result will always return a time span', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: (val) => {
        expect(throwOnError(oneSeventhMethod(val)) as TimeSpan).not.toBeNull()
      }
    })
  })
})

describe('High latitude: Middle of the night method pre conditions', () => {
  test('throws an error when no time span is null', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => (null as unknown) as TimeSpan,
      assert: val => {
        expect(() => throwOnError(middleOfTheNightMethod(val))).toThrowError()
      }
    })
  })
  test('throws an error when no time span is undefined', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => undefined as unknown as TimeSpan,
      assert: val => {
        expect(() => throwOnError(middleOfTheNightMethod(val))).toThrowError()
      }
    })
  })
})

describe('High latitude: Middle of the night based method invariance', () => {
  test('doesn\'t modify the passed in time span object', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: (val) => {
        const deepClone = val
        middleOfTheNightMethod(val)
        expect(deepClone).toEqual(val)
      }
    })
  })
})
describe('High latitude: Middle of the night based method  post conditions', () => {
  test('The result will always equal the time span divided by 4', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: val => {
        const expectedMilliseconds = (val.value / 4) >> 0
        const actual = throwOnError(middleOfTheNightMethod(val)).value
        expect(actual).toEqual(expectedMilliseconds)
      }
    })
  })
  test('the result will always return a time span', () => {
    iterativeTest<TimeSpan, void>({
      numberOfExecutions: 500,
      generateInput: () => randomTimeSpan(),
      assert: (val) => {
        expect(throwOnError(middleOfTheNightMethod(val)) as TimeSpan).not.toBeNull()
      }
    })
  })
})

interface HighLatitudeTestSpec {
  timeSpanBetweenSunsetAndSunrise: TimeSpan
  angle: number
  actual: Readonly<TimeSpan>
};

const highLatitudeTestSpec = (degree: AngularDegrees, timeSpanBetweenSunsetAndSunrise: TimeSpan): HighLatitudeTestSpec => ({
  timeSpanBetweenSunsetAndSunrise,
  angle: degree.value,
  actual: throwOnError(angleBasedMethod(degree, timeSpanBetweenSunsetAndSunrise))
})
