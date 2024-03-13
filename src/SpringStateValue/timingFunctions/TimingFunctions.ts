import { Bezier } from './Bezier'
import { EaseInOut } from './EaseInOut'
import { EaseIn } from './EaseIn'
import { EaseOut } from './EaseOut'
import { Linear } from './Linear'

export const timingFunctions = {
  linear: Linear,
  bezier: Bezier,
  'ease-in': EaseIn,
  'ease-out': EaseOut,
  'ease-in-out': EaseInOut
} as const
