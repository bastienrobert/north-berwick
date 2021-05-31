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
