import { IConfig } from './IConfig'
export type TypeA<TemplateType> = TemplateType | IConfig<TemplateType>
