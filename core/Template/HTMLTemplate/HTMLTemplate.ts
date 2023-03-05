import { BaseClass } from "../../BaseClass";
import { Template } from "../Template";
import { ITemplateStruct } from "../../types/ITemplateStruct";
import { IUpdateTemplateStruct } from "../../types/IUpdateTemplateStruct";
import { Style } from "./Attributes/Style";
import { ClassList } from "./Attributes/ClassList";
import { Events } from "./Attributes/Events";
import { Attributes } from "./Attributes/Attribute";
import { createChild } from "./createChild/createChild";
import { ID } from "./Attributes/Id";
import { UpdateFunction } from "../UpdateFunction";
import { DynamicStatic } from "../../types/DynamicStatic";
import { ITemplateChildStruct } from "../../types/ITemplateChildStruct";
import { State } from "../../State";

export class HTMLTemplate<T extends HTMLElement = HTMLElement>
  extends Template
  implements BaseClass
{
  _name = "HTMLTemplate";
  id: ID;

  classList: ClassList;
  style: Style;
  attributes: Attributes;
  events: Events;

  constructor(
    public element: T,
    private initStruct?: IUpdateTemplateStruct,
    parent?: HTMLTemplate
  ) {
    super();
    this.classList = new ClassList(this);
    this.style = new Style(this);
    this.attributes = new Attributes(this);
    this.events = new Events(this);
    this.id = new ID(this);
    this.parent = parent;

    this.classList.addClassList(Array.from(element.classList));
    this.tag = element.tagName.toLowerCase();

    this.id.setId(element.id);
    if (initStruct) {
      this.applyStruct(initStruct);
    }
  }

  setInnerHTML(data: string | (() => string)) {
    if (typeof data == "function") {
      const func = new UpdateFunction<string>((prev) => {
        const value = data();
        if (prev == value) return value;
        this.element.innerHTML = value;
        return value;
      });
      func.call();
      this.updateFuncs.push(func);
      return;
    }
    this.element.innerHTML = data;
  }

  get innerHTML() {
    return this.element.innerHTML;
  }

  applyStruct(initStruct?: IUpdateTemplateStruct) {
    this.initStruct = { ...this.initStruct, ...initStruct };
    if (!initStruct) return;
    if (initStruct.ref) {
      if (typeof initStruct.ref == "object") {
        if (initStruct.ref._name == "Ref") {
          initStruct.ref._template = this;
        }
      } else {
        initStruct.ref(this);
      }
    }

    if (initStruct.id) this.id.setDynamicID(initStruct.id);
    if (initStruct.style) this.style.setDynamicStyles(initStruct.style);
    if (initStruct.attributes)
      this.attributes.setAttributesDynamic(initStruct.attributes);

    if (initStruct.events) this.events.addEvents(initStruct.events);
    if (initStruct.className)
      this.classList.addClassNameDynamic(initStruct.className);
    if (initStruct.classList)
      this.classList.addClassListDynamic(initStruct.classList);
    if (initStruct.innerHTML) this.setInnerHTML(initStruct.innerHTML);

    if (initStruct.childs) this.addChildsDynamic(initStruct.childs);
    if (initStruct.watchStates) this.watchStates(initStruct.watchStates);
  }

  watchStates(states: State<any>[]) {
    states.forEach((state) => {
      state.callback = () => {
        this.updateFuncs.forEach((func) => func.call());
      };
    });
  }

  addChildsDynamic(childs: DynamicStatic<ITemplateChildStruct[]>) {
    if (typeof childs == "function") {
      const func = new UpdateFunction<ITemplateChildStruct[]>((prev) => {
        const value = childs();
        if (prev == value) return value;
        if (prev) this.deleteAllChilds();
        value.forEach((child) => this.addChild(child));
        return value;
      });
      func.call();
      this.updateFuncs.push(func);
      return;
    }

    childs.forEach((child) => this.addChild(child));
  }

  deleteAllChilds() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    this.childs = [];
  }

  addChild(
    child:
      | Template
      | HTMLElement
      | `textNode:${string}`
      | `template:${string}`
      | Text
      | ITemplateStruct
  ) {
    createChild(this, child);
  }

  protected _elemenInDom(): void {
    if (this.initStruct == undefined) return;
    if (this.initStruct.show) this.setShowDynamic(this.initStruct.show);
  }
}
