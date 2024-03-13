import { State } from '../State/State'
import { IConfig } from '../UpdateControler/types/IConfig'

export const ListenUpdate = (
  name: string,
  callback: () => void,
  states: State<unknown>[],
  config?: IConfig & { callfirst?: boolean }
): void => {
  if (config?.callfirst) {
    callback()
  }
  states.forEach((state) => state.registerUpdateCallback(name, callback, config))
}
