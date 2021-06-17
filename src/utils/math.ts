import { MathUtils } from 'three'

export interface TargetDimensions {
  width: number
  height: number
}

export interface ComputedBounds {
  left: number
  top: number
  width: number
  height: number
  scale: number
}

function calculate(
  target: TargetDimensions,
  container: TargetDimensions,
  cover: boolean,
): ComputedBounds {
  const rw = container.width / target.width
  const rh = container.height / target.height
  const r = cover ? (rw > rh ? rw : rh) : rw < rh ? rw : rh

  return {
    left: (container.width - target.width * r) >> 1,
    top: (container.height - target.height * r) >> 1,
    width: target.width * r,
    height: target.height * r,
    scale: r,
  }
}

export function cover(target: TargetDimensions, container: TargetDimensions) {
  return calculate(target, container, true)
}

export function contain(target: TargetDimensions, container: TargetDimensions) {
  return calculate(target, container, false)
}

export function clamp(value: number, min: number, max: number) {
  return MathUtils.clamp(value, min, max)
}

export function normalize(value: number, min: number, max: number) {
  return (value - min) / (max - min)
}

export function multipleOf(num: number, mul: number) {
  return num && mul ? Math.round(num / mul) * mul : num
}

export function range(size: number, startAt = 0) {
  return [...Array(size).keys()].map((i) => i + startAt)
}

// prettier-ignore
const ROMAN_NUMERALS = [
  ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'], // 1-9
  ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'], // 10-90
  ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'], // 100-900
  ['M', 'MM', 'MMM'], // 1000-3000
]
export function romanize(original: number): string {
  if (original < 1 || original > 3999) {
    throw new Error('Error: Input integer limited to 1 through 3,999')
  }

  const digits = Math.round(original).toString().split('')
  let position = digits.length - 1

  return digits.reduce((roman, digit) => {
    if (digit !== '0') {
      roman += ROMAN_NUMERALS[position][parseInt(digit) - 1]
    }
    position -= 1
    return roman
  }, '')
}
