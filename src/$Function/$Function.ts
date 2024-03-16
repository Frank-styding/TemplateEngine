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

export function $<T extends keyof ITagMap>(
  a: T,
  b?: ICreateConfig,
  c?: TemplateData[]
): Template<ITagMap[T]>

export function $<T extends keyof ITagMap>(
  a: T,
  b?: TemplateData[],
  c?: undefined
): Template<ITagMap[T]>

export function $<T extends keyof ITagMap>(
  a: T,
  b?: string | State<string> | StateTemplate<string>,
  c?: undefined
): Template<ITagMap[T]>

export function $<T extends State<any>[]>(
  a: T,
  b?: (...data: MapStateValues<T>) => Template | Component | undefined,
  c?: undefined
): DynamicTemplate

export function $(a: any, b: any, c: any): any {
  if (Array.isArray(a)) {
    return new DynamicTemplate(a, b)
  }
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

function createSvg<T extends keyof ITagMap>(
  a: T,
  b?: ICreateConfig,
  c?: TemplateData[]
): Template<ITagMap[T]>

function createSvg<T extends keyof ITagMap>(
  a: T,
  b?: TemplateData[],
  c?: undefined
): Template<ITagMap[T]>

function createSvg<T extends keyof ITagMap>(
  a: T,
  b?: string | State<string> | StateTemplate<string>,
  c?: undefined
): Template<ITagMap[T]>

function createSvg<T extends State<any>[]>(
  a: T,
  b?: (...data: MapStateValues<T>) => Template | Component | undefined,
  c?: undefined
): DynamicTemplate

function createSvg(a: any, b: any, c: any): any {
  if (Array.isArray(a)) {
    return new DynamicTemplate(a, b)
  }
  if (typeof a === 'string') {
    if (Array.isArray(b)) {
      return Template.create({ tag: a as keyof ITagMap, childs: b, svg: true })
    }
    if (typeof b == 'object') {
      if (Array.isArray(c)) {
        return Template.create({ tag: a as keyof ITagMap, ...b, childs: c, svg: true })
      }
      if (c === undefined) {
        return Template.create({ tag: a as keyof ITagMap, ...b, svg: true })
      }
    }
    if (typeof b == 'string') {
      return Template.create({ tag: a as keyof ITagMap, innerHTML: b, svg: true })
    }
    return Template.create({ tag: a as keyof ITagMap, svg: true })
  }
  return undefined
}

$.svg = createSvg

function createState<T>(value: T, data?: undefined): State<T>
function createState(value: number, data?: ISpringConfig): SpringStateValue
function createState(a: any, b: any): any {
  if (b != undefined) {
    return new SpringStateValue(a, b)
  }
  return new State(a)
}
$.State = createState

type Query = `query:${string}`
function query(a: Query, b?: ICreateConfig, c?: TemplateData[]): Template
function query(a: Query, b?: TemplateData[], c?: undefined): Template
function query(a: any, b: any, c: any): undefined | Template {
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
$.query = query

$.component = <T extends any[]>(
  name: string,
  callback: (...value: T) => Template
): ((...value: T) => Component) => {
  const componentCallback = (...data: any[]): Component => {
    const template = callback(...(data as T))
    return new Component(template, name)
  }
  return componentCallback
}

$.listen = <T extends State<any>[]>(
  name: string,
  a: T,
  b: (...data: MapStateValues<T>) => void
): void => {
  ListenUpdate(name, b, a)
}
type QueryAll = `queryAll:${string}`
$.queryAll = (a: QueryAll): Template[] => {
  const templates: Template[] = []
  const elements = document.querySelectorAll(a.replace('queryAll:', '').replace(/ /g, ''))
  elements.forEach((element) => {
    templates.push(new Template({ element: element as IElement }))
  })
  return templates
}

$.styled = (b: string): typeof create => {
  const globalStyle = GlobalStyle.createStyleSelector(b)
  return (a: any, b: any, c: any) => {
    const template = create(a, b, c)
    template.classNames.push(globalStyle)
    return template
  }
}

$.root = Template.Root
$.createSelector = GlobalStyle.createStyleSelector
