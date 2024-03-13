import { BezierData } from '../types/ITimingFuncData'

function A(aA1: number, aA2: number): number {
  return 1.0 - 3.0 * aA2 + 3.0 * aA1
}
function B(aA1: number, aA2: number): number {
  return 3.0 * aA2 - 6.0 * aA1
}
function C(aA1: number): number {
  return 3.0 * aA1
}

function _CalcBezier(aT: number, aA1: number, aA2: number): number {
  return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT
}

function GetSlope(aT: number, aA1: number, aA2: number): number {
  return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1)
}

function GetTForX(x: number, x1: number, x2: number): number {
  let aGuessT = x
  for (let i = 0; i < 4; ++i) {
    const currentSlope = GetSlope(aGuessT, x1, x2)
    if (currentSlope == 0.0) return aGuessT
    const currentX = _CalcBezier(aGuessT, x1, x2) - x
    aGuessT -= currentX / currentSlope
  }
  return aGuessT
}

function CalcBezier(x1: number, y1: number, x2: number, y2: number, x: number): number {
  if (x1 == y1 && x2 == y2) return x
  return _CalcBezier(GetTForX(x, x1, x2), y1, y2)
}

export const Bezier = (k: number, config: BezierData): number => {
  const [x1 = 0, y1 = 1, x2 = 1, y2 = 0] = config || []
  return CalcBezier(x1, y1, x2, y2, k)
}
