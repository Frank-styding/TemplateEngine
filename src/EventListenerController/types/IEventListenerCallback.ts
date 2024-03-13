export type IEventListenerCallback<TEvent, GlobalContext> = (
  context: TEvent,
  globalContext: GlobalContext
) => void
