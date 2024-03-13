import { ISpringConfig, ISpringConfigStruct } from './types/ISpringConfig'
import { State } from '../State/State'
import { IUpdateValueData } from './types/IUpdateValueData'
import { timingFunctions } from './timingFunctions/TimingFunctions'
import { ITimingFunction } from './types/ITimingFunction'
import { setPrecision } from './setPrecision'
import { Slerp } from '../util/Slerp'

export class SpringStateValue extends State<number> {
  private updatesValueData: IUpdateValueData[]
  private startTime?: number
  private currentUpdateValueData?: IUpdateValueData
  private initialConfig: ISpringConfig
  private startValue: number

  constructor(initialValue: number, _initialConfig?: ISpringConfig) {
    super(initialValue)
    this.updatesValueData = []
    this.initialConfig = {
      ...SpringStateValue.DEFAULT_UPDATE_CONFIG,
      ..._initialConfig
    }
    this.startValue = this._value
  }

  get value(): number {
    return this._value
  }

  set value(value: number) {
    this.updatesValueData.push({
      config: this.initialConfig,
      endValue: value
    })
    this.createAnimation()
  }

  setValue(value: number, config: ISpringConfig): SpringStateValue {
    this.updatesValueData.push({
      config: { ...this.initialConfig, ...config },
      endValue: value
    })
    this.createAnimation()
    return this
  }

  private UpdateAnimationValue(k: number): void {
    const { precision, timingFunctionName, timingData } = this.currentUpdateValueData
      ?.config as ISpringConfigStruct
    const { endValue = 0 } = this.currentUpdateValueData || {}

    if (k == 1) {
      this.startValue = endValue
    }

    k = setPrecision(k, precision)
    const t = (timingFunctions[timingFunctionName] as ITimingFunction)(k, timingData)
    const prev_value = this._value
    this._value = Slerp(t, this.startValue, endValue)
    this.callUpdateCallbacks(this._value, prev_value)
  }

  private createAnimation(): void {
    if (this.currentUpdateValueData == undefined) {
      if (this.updatesValueData.length == 0) {
        return
      }
      const updateData = this.updatesValueData.shift()
      this.currentUpdateValueData = updateData
      this.startTime = Date.now()
      window.requestAnimationFrame(() => {
        this.createAnimation.call(this)
      })
    } else {
      if (this.startTime == undefined) return
      const diff = Date.now() - this.startTime
      const duration = this.currentUpdateValueData.config.duration || 0
      if (diff <= duration) {
        this.UpdateAnimationValue(diff / duration)
      } else {
        this.UpdateAnimationValue(1)
        this.startTime = Date.now()
        this.currentUpdateValueData = undefined
      }
    }
    window.requestAnimationFrame(() => {
      this.createAnimation.call(this)
    })
  }

  private static DEFAULT_UPDATE_CONFIG: ISpringConfig = {
    duration: 1000,
    timingFunctionName: 'linear',
    precision: 2
  }
}
