import { uuidv4 } from '../uuid/uuid'
import { ICreateConfig } from './types/ICreateConfig'
import { IElement } from './types/IElement'
import { IStyle } from './types/IStyle'
import { TypeA } from './types/TypeA'
import { IAttributes } from './types/IAttributes'
import { ITagMap } from './types/ITagMap'
import { TemplateStruct } from './types/TemplateStruct'
import { DynamicObject } from '../DynamicObject/DynamicObject'
import { IConfig } from './types/IConfig'
import { DynamicValue } from '../DynamicValue/DynamicValue'
import { isElement } from './isElement'
import { EventListenerController } from '../EventListenerController/EventListenerController'
import { IEventStruct } from './types/IEventStruct'
import { IContext } from './types/IContext'
import { IRegisterContext } from '../EventListenerController/types/IRegisterContext'
import { DynamicList } from '../DynamicList/DynamicList'
import { IDynamicValue } from '../DynamicValue/types/IDynamicValue'
import { DynamicTemplate } from '../DynamicTemplate/DynamicTemplate'
import { ListenUpdate } from '../ListenUpdate/ListenUpdate'
import { TemplateData } from './types/TemplateData'
import { State } from '../State/State'
import { Component } from '../Component/Component'
import { IDynamicObject } from '../DynamicObject/types/IDynamicObject'

export class Template<TemplateType extends IElement = IElement> {
  private _element: TemplateType
  private _uuid: string
  private _innerHTML: DynamicValue<string>
  private _parent?: Template

  private _childs_struct: ((Template | Component) | (Template | Component)[])[]
  private _childs: (Template | Component)[]

  style: DynamicObject<IStyle>
  attributes: DynamicObject<IAttributes>
  events: EventListenerController<IEventStruct, IContext>
  classNames: DynamicList<string>

  constructor(data?: TypeA<TemplateType>) {
    this._uuid = uuidv4()
    this._childs = []
    this._childs_struct = []
    this._parent = undefined
    this._element = this._getElementFromData(data)
    this.events = new EventListenerController(this._registerCallback.bind(this), 'template')

    this.style = new DynamicObject(
      this._uuid + ':style:',
      this._removeStyleProperty.bind(this),
      this._setStyleProperty.bind(this),
      this._getStyleFromData(data)
    )

    this.attributes = new DynamicObject(
      this._uuid + ':attributes:',
      this._removeAttributeProperty.bind(this),
      this._setAttributeProperty.bind(this),
      this._getAttributesFromData(data)
    )

    this.classNames = new DynamicList(
      new Set<string>([]),
      this._removeClassName.bind(this),
      this._setClassName.bind(this)
    )

    this._innerHTML = new DynamicValue(
      this._uuid + ':innerHTML',
      this._setInnerHTML.bind(this),
      this._getInnerHTMLFromData(data),
      false
    )

    if (!isElement(data)) {
      const { events, childs, classNames } = data as IConfig<TemplateType>
      if (events) {
        this.events.setEvents('template', events)
      }
      if (childs) {
        this.appendChilds(childs)
      }
      if (classNames) {
        this.classNames.push(classNames)
      }
    }
  }

  private _getInnerHTMLFromData(
    data?: IElement | IConfig<TemplateType>
  ): IDynamicValue<string> | undefined {
    if (isElement(data)) return
    return (data as IConfig<TemplateType>).innerHTML
  }

  private _getAttributesFromData(
    data?: IElement | IConfig<TemplateType>
  ): IDynamicObject<IAttributes> | undefined {
    if (isElement(data)) return
    return (data as IConfig<TemplateType>).attributes
  }

  private _getStyleFromData(
    data?: IElement | IConfig<TemplateType>
  ): IDynamicObject<IStyle> | undefined {
    if (isElement(data)) return
    return (data as IConfig<TemplateType>).style
  }

  private _getElementFromData(data?: IElement | IConfig<TemplateType>): TemplateType {
    if (isElement(data)) return data as TemplateType
    return (data as IConfig<TemplateType>).element
  }

  private _registerCallback(context: IRegisterContext): void {
    if (context.contextName == 'template') {
      this._element?.addEventListener(context.eventName as string, context.callback)
    }
  }

  private _setStyleProperty<K extends keyof IStyle>(name: K, value: IStyle[K]): void {
    const _name = (name as string).replace(
      /[a-z][A-Z]/g,
      (sub) => sub[0] + '-' + sub[1].toLowerCase()
    )
    this._element?.style.setProperty(_name as string, `${value}`)
  }

  private _removeStyleProperty<K extends keyof IStyle>(name: K): void {
    this._element?.style.removeProperty(name as string)
  }

  private _setAttributeProperty(name: string, value: string | number): void {
    this._element?.setAttribute(name, `${value}`)
  }

  private _removeAttributeProperty(name: string): void {
    this._element?.removeAttribute(name)
  }

  private _setInnerHTML(value: string): void {
    if (this._element == undefined) return
    this._element.innerHTML = value
  }

  private _removeClassName(value: string[]): void {
    this._element.classList.remove(...value)
  }

  private _setClassName(value: string[]): void {
    this._element.classList.add(...value)
  }

  private _updateDynamicChilds(
    idx: number,
    new_childs?: Template[] | Component | Template | null
  ): void {
    const startChilds = this._childs_struct
      .filter((section, _idx) => {
        if (section instanceof Template || section instanceof Component) {
          return _idx < idx
        }
        return _idx < idx && section.length > 0
      })
      .flat(2)

    const endChilds = this._childs_struct
      .filter((section, _idx) => {
        if (section instanceof Template || section instanceof Component) {
          return _idx > idx
        }
        return _idx > idx && section.length > 0
      })
      .flat(2)

    const section = this._childs_struct[idx] as (Template | Component)[]

    const getTemplate = (a: Template | Component): Template =>
      a instanceof Template ? a : a.template

    if (new_childs instanceof Template || new_childs instanceof Component) {
      if (section.length > 0) {
        section.forEach((x) => this._element.removeChild(getTemplate(x)._element))
      }
      section.splice(0, section.length, new_childs)
      this._childs.splice(startChilds.length, section.length, new_childs)
      if (startChilds.length == 0) {
        if (endChilds.length == 0) {
          this._element.appendChild(getTemplate(new_childs)._element)
          return
        }
        getTemplate(endChilds[0])._element.insertAdjacentElement(
          'beforebegin',
          getTemplate(new_childs)._element
        )
        return
      }
      const startChild = startChilds.slice(-1)[0]
      getTemplate(startChild)._element.insertAdjacentElement(
        'afterend',
        getTemplate(new_childs)._element
      )
      return
    }

    if (new_childs == null || new_childs == undefined) {
      if (section.length == 0) return
      this._childs.splice(startChilds.length, 1)
      this._element.removeChild(getTemplate(section[0])._element)
      section.splice(0, 1)
      return
    }

    if (Array.isArray(new_childs)) {
      section.forEach((child) => this._element.removeChild(getTemplate(child)._element))
      section.splice(0, section.length, ...new_childs)
      if (startChilds.length > 0) {
        const startTemplate = startChilds.splice(-1)[0]
        section.reverse().forEach((child) => {
          getTemplate(startTemplate)._element.insertAdjacentElement(
            'afterend',
            getTemplate(child)._element
          )
        })
        return
      }
      if (endChilds.length > 0) {
        const endTemplate = endChilds.splice(0)[0]
        section.forEach((child) => {
          getTemplate(endTemplate)._element.insertAdjacentElement(
            'beforebegin',
            getTemplate(child)._element
          )
        })
        return
      }
      section.forEach((child) => {
        this._element.appendChild(getTemplate(child)._element)
      })
    }
  }

  get innerHTML(): string {
    if (this._innerHTML == undefined) {
      if (this._element == undefined) {
        return ''
      }
      return this._element.innerHTML
    }
    return this._innerHTML.get()
  }

  set innerHTML(value: string) {
    if (this._innerHTML == undefined) {
      if (this._element == undefined) return
      this._element.innerHTML = value
      return
    }
    this._innerHTML.set(value)
  }

  appendChilds(childs_data: TemplateData[] | TemplateData): void {
    if (!Array.isArray(childs_data)) {
      if (childs_data instanceof Component) {
        childs_data = childs_data.template
      } else if (!(childs_data instanceof Template) && !(childs_data instanceof DynamicTemplate)) {
        childs_data = Template.create(childs_data)
      }

      childs_data = [childs_data]
    }

    childs_data.forEach((child, idx) => {
      if (child instanceof DynamicTemplate) {
        const template = child.callback(...child.states.map((x) => x.value))
        ListenUpdate(
          this._uuid + ':childs',
          () => {
            this._updateDynamicChilds(idx, child.callback(...child.states.map((x) => x.value)))
          },
          child.states
        )

        if (template == undefined || template == null) {
          this._childs_struct.push([])
          return
        }
        if (Array.isArray(template)) {
          template.forEach((x) => {
            this._element.appendChild(x._element)
            this._childs.push(x)
          })

          this._childs_struct.push(template)
          return
        }

        if (template instanceof Component) {
          this._element.appendChild(template.template._element)
          this._childs_struct.push([template])
          return
        }
        this._element.appendChild(template._element)
        this._childs_struct.push([template])
        return
      }

      if (child instanceof Template) {
        child._parent = this
        this._childs_struct.push(child)
        this._childs.push(child)
        this._element.appendChild(child._element)
        return
      }
      if (child instanceof Component) {
        child.template._parent = this
        this._childs_struct.push(child)
        this._childs.push(child)
        this._element.appendChild(child.template._element)
        return
      }

      const template = Template.create(child)
      template._parent = this
      this._childs_struct.push(template)
      this._childs.push(template)
      this._element.appendChild(template._element)
    })
  }

  getElement(): TemplateType {
    return this._element
  }

  getChilds(): (Template | Component)[] {
    return this._childs
  }

  private static dynamicsTemplate: Record<string, Template> = {}

  static DynamicTemplate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    states: State<any>[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (...value: any[]) => Template[] | Template | null | undefined
  ): DynamicTemplate => new DynamicTemplate(states, callback)

  static create<K extends keyof ITagMap>(a: TemplateStruct<K>): Template<ITagMap[K]> {
    const tag = a.tag
    const { svg } = a || ({} as ICreateConfig)
    const element = svg
      ? document.createElementNS('http://www.w3.org/2000/svg', tag)
      : document.createElement(tag)

    const template = new Template({ element, ...a }) as Template<ITagMap[K]>
    if (a.key != undefined) {
      if (this.dynamicsTemplate[a.key] != undefined)
        return this.dynamicsTemplate[a.key] as Template<ITagMap[K]>
      this.dynamicsTemplate[a.key] = template
    }

    return template
  }

  static Root = new Template(document.getElementById('root') as HTMLElement)
}
