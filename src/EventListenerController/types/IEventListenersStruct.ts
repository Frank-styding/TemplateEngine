import { IEventListeners } from './IEventListeners'

export type IEventListenersStruct<Struct, Context> = {
  [K in keyof Struct]: IEventListeners<Struct[K], Context>
}
