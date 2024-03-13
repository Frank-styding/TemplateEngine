import { BezierData, TimingData } from './ITimingFuncData'
import { timingFunctions } from '../timingFunctions/TimingFunctions'

export type ISpringConfig = { duration?: number; precision?: number } & (
  | {
      timingFunctionName: 'bezier'
      timingData?: BezierData
    }
  | { timingFunctionName?: keyof typeof timingFunctions }
)

export type ISpringConfigStruct = {
  duration?: number
  precision?: number
  timingFunctionName: keyof typeof timingFunctions
  timingData?: TimingData
}
