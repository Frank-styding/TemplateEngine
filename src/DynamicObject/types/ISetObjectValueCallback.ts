export type ISetObjectValueCallback<T> = <K extends keyof T>(key: K, value: T[K]) => void
