import { IElementEventMap } from './IEventMap'

export interface IEventStruct {
  template: {
    [K in keyof IElementEventMap]?: IElementEventMap[K]
  }
}
