import { IConfig } from './IConfig'

export type ICreateConfig = Omit<IConfig<undefined>, 'element'> & {
  svg?: boolean
  key?: string
}
