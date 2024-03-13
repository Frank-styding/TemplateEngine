/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '../Component/Component'
import { State } from '../State/State'
import { Template } from '../Template/Template'

export class DynamicTemplate {
  constructor(
    public states: State<any>[],
    public callback: (...value: any[]) => Template[] | Component | Template | null | undefined
  ) {}
}
