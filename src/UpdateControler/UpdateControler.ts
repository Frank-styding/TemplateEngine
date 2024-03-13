import { IConfig } from './types/IConfig'
import { Priority } from '../util/Priority'
import { RecordCallbacks } from './types/RecordCallbacks'
import { UpdateCallback } from './types/UpdateCallback'

export class UpdateControler<T> {
  private recordCallbacks: RecordCallbacks<T>
  constructor() {
    this.recordCallbacks = {
      [Priority.LOW]: {},
      [Priority.NORMAL]: {},
      [Priority.HIGHT]: {}
    }
  }

  registerUpdateCallback(senderName: string, callback: UpdateCallback<T>, config?: IConfig): void {
    const { priority = Priority.LOW } = config || ({} as IConfig)

    if (this.recordCallbacks[priority][senderName] == undefined) {
      this.recordCallbacks[priority][senderName] = callback
    } else {
      //console.warn(`can't create again ${name}(${priority})`);
    }
  }

  existCallback(name: string): boolean {
    return (
      this.recordCallbacks[Priority.HIGHT][name] != undefined ||
      this.recordCallbacks[Priority.NORMAL][name] != undefined ||
      this.recordCallbacks[Priority.LOW][name] == undefined
    )
  }

  protected callUpdateCallbacks(value: T | undefined, pre_value: T | undefined): void {
    Object.values(this.recordCallbacks[Priority.HIGHT]).map((item) =>
      item(value as T, pre_value as T)
    )
    Object.values(this.recordCallbacks[Priority.NORMAL]).map((item) =>
      item(value as T, pre_value as T)
    )
    Object.values(this.recordCallbacks[Priority.LOW]).map((item) =>
      item(value as T, pre_value as T)
    )
  }
}
