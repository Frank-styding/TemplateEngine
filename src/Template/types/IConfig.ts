import { IStyle } from './IStyle'
import { IAttributes } from './IAttributes'
import { IDynamicValue } from '../../DynamicValue/types/IDynamicValue'
import { IDynamicObject } from '../../DynamicObject/types/IDynamicObject'
import { IEventStruct } from './IEventStruct'
import { IContext } from './IContext'
import { IEventListenersStruct } from '../../EventListenerController/types/IEventListenersStruct'
import { TemplateData } from './TemplateData'

export interface IConfig<TemplateType> {
  element: TemplateType
  style?: IDynamicObject<IStyle>
  attributes?: IDynamicObject<IAttributes>
  classNames?: string[]
  childs?: TemplateData[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerHTML?: IDynamicValue<string>
  events?: IEventListenersStruct<IEventStruct, IContext>['template']
}
