import { useCallback, useEffect, useState } from 'react'
import { useAtom, WritableAtom } from 'jotai'
import { compareArrayValues } from '@/utils/array'

interface Results<T> {
  next: T
  errors: number
}

interface GetResultsParams<T> {
  answers: T
  corrects: T
  reset: T
}

function getResults<T extends Record<string, any>>({
  answers,
  corrects,
  reset,
}: GetResultsParams<T>): Results<T> {
  return Object.entries<T>(answers).reduce(
    (acc, [key, value]: [keyof T, any]) => {
      if (Array.isArray(corrects[key])) {
        if (!compareArrayValues(value, corrects[key])) {
          acc.next[key] = reset[key]
          acc.errors++
        }
      } else {
        if (corrects[key] !== value) {
          acc.next[key] = reset[key]
          acc.errors++
        }
      }

      return acc
    },
    { next: { ...answers }, errors: 0 },
  )
}

interface UseChapterAnswersParams<R> {
  store: WritableAtom<R, any>
  corrects: R
  reset: R
  isComplete?: (answers: R) => boolean
}

export default function useChapterAnswers<R>({
  store,
  corrects,
  reset,
  isComplete = (answers) => Object.values(answers).every((a) => a),
}: UseChapterAnswersParams<R>) {
  const [answers, _setAnswers] = useAtom(store)
  const [results, setResults] = useState<R | true>()

  const setAnswers = (payload: Partial<typeof answers>) => {
    const next = { ...answers, ...payload }
    _setAnswers(next)
    return isComplete(next)
  }

  const swapAnswers = () => {
    _setAnswers(results as typeof answers)
    setResults(undefined)
  }

  useEffect(() => {
    if (isComplete(answers)) {
      const { next, errors } = getResults({
        answers,
        corrects,
        reset,
      })

      setResults(errors > 0 ? next : true)
    }
  }, [answers])

  return { answers, results, setAnswers, swapAnswers }
}
