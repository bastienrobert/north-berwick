type Nullable<T> = { [P in keyof T]: T[P] | null }

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]
