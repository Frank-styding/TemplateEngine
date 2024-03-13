import { State } from '../../State/State'
import { StateTemplate } from '../../StateTemplate/StateTemplate'

export type IDynamicObject<T> = {
  [K in keyof T]?: T[K] | State<T[K]> | StateTemplate<T[K]>
}
