import { ICreateConfig } from './ICreateConfig'
import { ITagMap } from './ITagMap'
import { StateTemplate } from '../../StateTemplate/StateTemplate'
import { TemplateData } from './TemplateData'

export interface TemplateStruct<T extends keyof ITagMap = keyof ITagMap> extends ICreateConfig {
  tag: T
  innerHTML?: StateTemplate<string> | string
  childs?: TemplateData[]
}
