export function rubberband(
  distance: number,
  dimension: number,
  constant: number,
) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) {
    return Math.pow(distance, constant * 5)
  }
  return (distance * dimension * constant) / (dimension + constant * distance)
}

export function rubberbandIfOutOfBounds(
  position: number,
  min: number,
  max: number,
  constant = 0.55,
) {
  if (position < min) {
    return -rubberband(min - position, max - min, constant) + min
  }
  if (position > max) {
    return +rubberband(position - max, max - min, constant) + max
  }
  return position
}
