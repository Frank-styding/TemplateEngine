import { Priority } from '../../util/Priority'
import { UpdateCallback } from './UpdateCallback'

export type RecordCallbacks<T> = Record<Priority, Record<string, UpdateCallback<T>>>
