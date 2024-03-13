import { ListenUpdate } from '../ListenUpdate/ListenUpdate'
import { State } from '../State/State'
import { StateTemplate } from '../StateTemplate/StateTemplate'
import { IDynamicValue } from './types/IDynamicValue'
import { ISetValueCallback } from './types/ISetValue'

export class DynamicValue<T> {
  private _value?: T

  constructor(
    private name: string,
    private setCallback?: ISetValueCallback<T>,
    private data?: IDynamicValue<T>,
    private callFirst: boolean = true
  ) {
    this.register()
  }

  set(value?: T): DynamicValue<T> {
    if (value == undefined) return this
    if (typeof value != 'object') {
      this._value = value
      if (this.setCallback) this.setCallback(value)
    }
    return this
  }

  get(): T {
    return this._value as T
  }

  private register(): void {
    const data = this.data

    if (typeof data != 'object') {
      this.set(data)
      return
    }

    if (data instanceof State) {
      this.set(data.value)
      data.registerUpdateCallback(this.name, (value) => this.set(value))
      return
    }

    if (data instanceof StateTemplate) {
      const template = data as StateTemplate<T>
      ListenUpdate(
        this.name,
        () => this.set(template.template(...template.states.map((state) => state.value))),
        template.states,
        { callfirst: this.callFirst }
      )
      return
    }
  }
}
