interface Results<T> {
  next: T
  errors: number
}

interface GetResultsParams<T> {
  answers: T
  corrects: T
  reset: T
}

export default function getResults<T extends Record<string, any>>({
  answers,
  corrects,
  reset,
}: GetResultsParams<T>): Results<T> {
  return Object.entries<T>(answers).reduce(
    (acc, [key, value]: [keyof T, any]) => {
      if (corrects[key] !== value) {
        acc.next[key] = reset[key]
        acc.errors++
      }

      return acc
    },
    { next: { ...answers }, errors: 0 },
  )
}
