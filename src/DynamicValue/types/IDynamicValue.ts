import { State } from '../../State/State'
import { StateTemplate } from '../../StateTemplate/StateTemplate'

export type IDynamicValue<T> = StateTemplate<T> | T | State<T>
