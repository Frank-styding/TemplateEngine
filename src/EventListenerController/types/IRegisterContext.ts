export type IRegisterContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (context: any) => void
  eventName: string
  contextName: string
}
