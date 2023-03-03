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
    private info?: IUpdateTemplateStruct,
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
    this.tag = element.tagName;

    this.id.setId(element.id);

    if (info) {
      this.applyStruct(info);
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

  applyStruct(struct: IUpdateTemplateStruct) {
    if (struct.ref) {
      if (typeof struct.ref == "object") {
        if (struct.ref._name == "Ref") {
          struct.ref._template = this;
        }
      } else {
        struct.ref(this);
      }
    }

    if (struct.id) this.id.setDynamicID(struct.id);
    if (struct.style) this.style.setDynamicStyles(struct.style);
    if (struct.attributes)
      this.attributes.setAttributesDynamic(struct.attributes);

    if (struct.events) this.events.addEvents(struct.events);
    if (struct.className) this.classList.addClassNameDynamic(struct.className);
    if (struct.classList) this.classList.addClassListDynamic(struct.classList);
    if (struct.innerHTML) this.setInnerHTML(struct.innerHTML);

    if (struct.childs) this.addChildsDynamic(struct.childs);
    if (struct.show) this.setShowDynamic(struct.show);
    if (struct.watchStates) this.watchStates(struct.watchStates);
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

  update() {}
}
