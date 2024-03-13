/* eslint-disable @typescript-eslint/no-explicit-any */
import { validateChange } from '../util/validateChange'
import { IStateTemplates } from './types/IStateTemplates'
import { UpdateControler } from '../UpdateControler/UpdateControler'
import { StateTemplate } from '../StateTemplate/StateTemplate'

export class State<T> extends UpdateControler<T> {
  protected _value: T

  constructor(initial_value: T) {
    super()
    this._value = initial_value as T
  }

  get value(): T {
    return this._value
  }

  set value(value: T) {
    if (validateChange(value, this._value)) {
      this._value = value
      this.callUpdateCallbacks(this._value, value)
    }
  }

  get template(): IStateTemplates {
    return {
      px: {
        states: [this],
        template: (value) => `${value}px`
      }
    }
  }

  static StateTemplate<T>(
    states: State<any>[],
    template: (...values: any[]) => T
  ): StateTemplate<T> {
    return new StateTemplate(states, template)
  }

  toPx(): string {
    return this._value + 'px'
  }
}
