import { ListenUpdate } from '../ListenUpdate/ListenUpdate'
import { State } from '../State/State'
import { StateTemplate } from '../StateTemplate/StateTemplate'
import { validateChange } from '../util/validateChange'
import { IDynamicObject } from './types/IDynamicObject'
import { IRemoveObjectValueCallback } from './types/IRemoveObjectValueCallback'
import { ISetObjectValueCallback } from './types/ISetObjectValueCallback'

export class DynamicObject<T> {
  private value: T
  constructor(
    private name: string,
    private removeCallback?: IRemoveObjectValueCallback<T>,
    private setCallback?: ISetObjectValueCallback<T>,
    private data: IDynamicObject<T> = {} as IDynamicObject<T>,
    private callFirst: boolean = true
  ) {
    this.value = {} as T
    this.register()
  }

  setValue<K extends keyof T>(name: K, value?: T[K]): DynamicObject<T> {
    if (validateChange(this.value[name], value)) {
      this.value[name] = value as T[K]
      if (value == undefined) {
        if (this.removeCallback) this.removeCallback(name)
      } else {
        if (this.setCallback) this.setCallback(name, value)
      }
    }
    return this
  }

  update(new_data?: T): DynamicObject<T> {
    if (new_data == undefined) {
      return this
    }

    Object.keys(new_data).forEach((key) => {
      const data_value = this.data[key as keyof T]
      if (
        typeof data_value == 'object' &&
        (data_value instanceof State || data_value instanceof StateTemplate)
      )
        return

      this.setValue(key as keyof T, new_data[key as keyof T])
    })

    return this
  }

  set(data: T): DynamicObject<T> {
    if (data == undefined) {
      return this
    }
    Object.keys(this.value as Record<string, unknown>).forEach((key) => {
      const data_value = this.data[key as keyof T]
      if (
        typeof data_value == 'object' &&
        (data_value instanceof State || data_value instanceof StateTemplate)
      )
        return

      if (data[key as keyof T] == undefined) {
        if (this.removeCallback) this.removeCallback(key as keyof T)
        delete this.value[key as keyof T]
        delete this.data[key as keyof T]
      }
    })

    Object.keys(data).forEach((key) => {
      const data_value = this.data[key as keyof T]
      if (
        typeof data_value == 'object' &&
        (data_value instanceof State || data_value instanceof StateTemplate)
      )
        return

      this.setValue(key as keyof T, data[key as keyof T])
    })

    return this
  }

  remove(key: string): DynamicObject<T> {
    delete this.data[key]
    delete this.value[key]
    if (this.removeCallback) this.removeCallback(key as keyof T)
    return this
  }

  get(): T {
    return this.value
  }

  private register(): void {
    Object.keys(this.data).forEach((key) => {
      const value = this.data[key as keyof T]
      const name = this.name + key
      if (typeof value === 'object') {
        if (value instanceof State) {
          value.registerUpdateCallback(name, (value) => {
            this.setValue(key as keyof T, value)
          })
          this.setValue(key as keyof T, value.value)
          return
        }
        if (value instanceof StateTemplate) {
          const template = value as StateTemplate<T>
          const callback = (): void => {
            const n_value = template.template(...template.states.map((state) => state.value))
            this.setValue(key as keyof T, n_value as T[keyof T])
          }
          ListenUpdate(name, callback.bind(this), template.states, { callfirst: this.callFirst })
          return
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.setValue(key as keyof T, value as any)
    })
  }
}
