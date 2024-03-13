import { TimingData } from './ITimingFuncData'

export type ITimingFunction = (t: number, config?: TimingData) => number
