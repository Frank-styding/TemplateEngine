import { State } from '../State/State'

export class StateTemplate<T> {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public states: State<any>[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public template: (...values: any[]) => T
  ) {}
}
