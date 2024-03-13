import { IEventListener } from './IEventListener'

export type IEventListeners<Struct, Context> = {
  [U in keyof Struct]: IEventListener<Struct[U], Context>
}
