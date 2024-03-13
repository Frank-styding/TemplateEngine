/* eslint-disable @typescript-eslint/no-explicit-any */

import { Template } from '../Template/Template'
import { ITagMap } from '../Template/types/ITagMap'
import { ICreateConfig } from '../Template/types/ICreateConfig'
import { State } from '../State/State'
import { DynamicTemplate } from '../DynamicTemplate/DynamicTemplate'
import { TemplateData } from '../Template/types/TemplateData'
import { IElement } from '../Template/types/IElement'
import { StateTemplate } from '../StateTemplate/StateTemplate'
import { ListenUpdate } from '../ListenUpdate/ListenUpdate'
import { SpringStateValue } from '../SpringStateValue/SpringStateValue'
import { ISpringConfig } from '../SpringStateValue/types/ISpringConfig'
import { Component } from '../Component/Component'
import { GlobalStyle } from '../GlobalStyle/GlobalStyle'

type MapStateValues<T extends State<any>[]> = {
  [K in keyof T]: T[K]['value']
}
type Query = `query:${string}`
type QueryAll = `queryAll:${string}`

// create element
export function $<T extends keyof ITagMap>(
  a: T,
  b?: ICreateConfig,
  c?: TemplateData[]
): Template<ITagMap[T]>
export function $(a: Query, b?: ICreateConfig, c?: TemplateData[]): Template

export function $<T extends keyof ITagMap>(
  a: T,
  b?: TemplateData[],
  c?: undefined
): Template<ITagMap[T]>
export function $(a: Query, b?: TemplateData[], c?: undefined): Template

export function $<T extends keyof ITagMap>(
  a: T,
  b?: string | State<string> | StateTemplate<string>,
  c?: undefined
): Template<ITagMap[T]>

export function $(
  a: Query,
  b?: string | State<string> | StateTemplate<string>,
  c?: undefined
): Template

export function $(a: QueryAll, b?: undefined, c?: undefined): Template[]
//

export function $<T extends any[]>(
  a: `component:${string}`,
  callback: (...value: T) => Template,
  b?: undefined
): (...value: T) => Component

export function $<T extends State<any>[]>(
  a: T,
  b?: (...data: MapStateValues<T>) => Template | Component | undefined,
  c?: undefined
): DynamicTemplate

export function $(a: 'styled', b: string, c?: undefined): typeof create

export function $(a: any, b: any, c: any): any {
  if (Array.isArray(a)) {
    return new DynamicTemplate(a, b)
  }
  if (typeof a === 'string') {
    if (a.startsWith('component:')) {
      const componentName = a.replace('component:', '').replace(/ /g, '')
      const callback = b as (...value: any[]) => Template
      const componentCallback = (...data: any[]): Component => {
        const template = callback(...data)
        return new Component(template, componentName)
      }
      return componentCallback
    }

    if (a.startsWith('query:')) {
      const element = document.querySelector(
        a.replace('query:', '').replace(/ /g, '')
      ) as null | IElement
      if (element == null) {
        console.error(`can't find ${a.replace('query:', '').replace(/ /g, '')} query selector`)
        return undefined
      }

      if (Array.isArray(b)) {
        return new Template({ element, childs: b })
      } else if (typeof b == 'object') {
        if (Array.isArray(c)) {
          return new Template({ element, childs: c, ...b })
        }
        if (c === undefined) {
          return new Template({ element, ...b })
        }
      } else if (typeof b == 'string') {
        return new Template({ element, innerHTML: b })
      } else {
        return new Template({ element })
      }
    }

    if (a.startsWith('queryAll:')) {
      const templates: Template[] = []
      const elements = document.querySelectorAll(a.replace('queryAll:', '').replace(/ /g, ''))
      elements.forEach((element) => {
        templates.push(new Template({ element: element as IElement }))
      })
      return templates
    }

    if (a == 'styled') {
      const globalStyle = GlobalStyle.createStyleSelector(b)
      return (a: any, b: any, c: any) => {
        const template = create(a, b, c)
        template.classNames.push(globalStyle)
        return template
      }
    }

    if (Array.isArray(b)) {
      return Template.create({ tag: a as keyof ITagMap, childs: b })
    }
    if (typeof b == 'object') {
      if (Array.isArray(c)) {
        return Template.create({ tag: a as keyof ITagMap, ...b, childs: c })
      }
      if (c === undefined) {
        return Template.create({ tag: a as keyof ITagMap, ...b })
      }
    }
    if (typeof b == 'string') {
      return Template.create({ tag: a as keyof ITagMap, innerHTML: b })
    }
    return Template.create({ tag: a as keyof ITagMap })
  }
  return undefined
}

export function create<T extends keyof ITagMap>(
  a: T,
  b?: ICreateConfig,
  c?: TemplateData[]
): Template<ITagMap[T]>

export function create<T extends keyof ITagMap>(
  a: T,
  b?: TemplateData[],
  c?: undefined
): Template<ITagMap[T]>

export function create<T extends keyof ITagMap>(
  a: T,
  b?: string | State<string> | StateTemplate<string>,
  c?: undefined
): Template<ITagMap[T]>

export function create(a: any, b: any, c: any): any {
  if (typeof a === 'string') {
    if (Array.isArray(b)) {
      return Template.create({ tag: a as keyof ITagMap, childs: b })
    }
    if (typeof b == 'object') {
      if (Array.isArray(c)) {
        return Template.create({ tag: a as keyof ITagMap, ...b, childs: c })
      }
      if (c === undefined) {
        return Template.create({ tag: a as keyof ITagMap, ...b })
      }
    }
    if (typeof b == 'string') {
      return Template.create({ tag: a as keyof ITagMap, innerHTML: b })
    }
    return Template.create({ tag: a as keyof ITagMap })
  }
  return undefined
}

$.root = Template.Root

$.listen = <T extends State<any>[]>(
  name: string,
  a: T,
  b: (...data: MapStateValues<T>) => void
): void => {
  ListenUpdate(name, b, a)
}

function createState<T>(value: T, data?: undefined): State<T>
function createState(value: number, data?: ISpringConfig): SpringStateValue
function createState(a: any, b: any): any {
  if (b != undefined) {
    return new SpringStateValue(a, b)
  }
  return new State(a)
}

$.State = createState
