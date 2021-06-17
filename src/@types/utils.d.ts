type Nullable<T> = { [P in keyof T]: T[P] | null }

type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>
