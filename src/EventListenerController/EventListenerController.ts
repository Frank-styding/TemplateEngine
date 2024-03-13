import { IRegisterContext } from './types/IRegisterContext'
import { IEventListeners } from './types/IEventListeners'
import { IEventListenersStruct } from './types/IEventListenersStruct'
import { IEventListenerCallback } from './types/IEventListenerCallback'
import { IConfig } from './types/IConfig'
import { IEventListener } from './types/IEventListener'

export class EventListenerController<Struct, Context> {
  private eventListenersStruct: IEventListenersStruct<Struct, Context> =
    {} as IEventListenersStruct<Struct, Context>

  constructor(
    private registerEventCallback: (_context: IRegisterContext) => void,
    public defaultContextName: keyof Struct,
    public globalContext: Context = {} as Context
  ) {}

  setEvents<K extends keyof Struct>(
    contextName: K,
    struct: IEventListeners<Struct[K], Context>
  ): void {
    Object.keys(struct).forEach((key) => {
      const eventName = key as keyof typeof struct
      const eventListener = struct[eventName]
      if (typeof eventListener == 'function') {
        this.addEventListener(eventName as keyof Struct[keyof Struct], eventListener, {
          contextName
        })
      } else if (typeof eventListener == 'object') {
        this.addEventListener(eventName as keyof Struct[keyof Struct], eventListener, {
          contextName
        })
      }
    })
  }

  private registerEvent<K extends keyof Struct, U extends keyof Struct[K]>(
    eventName: U,
    contextName: K
  ): void {
    this.eventListenersStruct[contextName] ||= {} as IEventListeners<Struct[K], Context>
    const eventListener = this.eventListenersStruct[contextName]
    if (eventListener == undefined) return
    if (eventListener[eventName] == undefined) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const callback = (context: any): void => {
        this.dispatchEvent(eventName, context, contextName)
      }
      this.registerEventCallback({
        callback,
        eventName: eventName as string,
        contextName: contextName as string
      })
    }
  }

  addEventListener<K extends keyof Struct, U extends keyof Struct[K]>(
    eventName: U,
    callback: IEventListenerCallback<Struct[K][U], Context>,
    config?: IConfig<K>
  ): EventListenerController<Struct, Context> {
    const contextName = (config?.contextName || this.defaultContextName) as K
    this.registerEvent(eventName, contextName)

    const eventListeners = this.eventListenersStruct[contextName]

    if (eventListeners == undefined) {
      return this
    }
    eventListeners[eventName] = callback
    return this
  }

  dispatchEvent<K extends keyof Struct, U extends keyof Struct[K]>(
    eventName: U,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: any,
    _contextName?: K
  ): void {
    const contextName = (_contextName || this.defaultContextName) as K
    this.eventListenersStruct[contextName] ||= {} as IEventListeners<Struct[K], Context>
    const eventStruct = this.eventListenersStruct[contextName]

    if (eventStruct == undefined) return

    if (eventStruct[eventName] !== undefined) {
      const eventListener = eventStruct[eventName] as IEventListener<Struct[K][U], Context>
      if (typeof eventListener == 'function') {
        eventListener(context, this.globalContext)
        return
      }
    }
  }

  getEvents(): IEventListenersStruct<Struct, Context> {
    return this.eventListenersStruct
  }
}
