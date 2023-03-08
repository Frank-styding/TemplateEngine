import { generateUUID } from "../utils/genereUUID";
import { BaseClass } from "../utils/BaseClass";
import { ClassList } from "./Properties/ClassList";
import { Style } from "./Properties/Style";
import { Attributes } from "./Properties/Attributes";
import { Events } from "./Properties/Events";
import { ID } from "./Properties/Id";
import { createChild } from "./addChild/createChild";
import { ITemplateChildStruct } from "./types/ITemplateChildStruct";
import { UpdateFunction } from "./UpdateFunction";
import { IDynamicStatic } from "./types/IDynamicStatic";
import { dynamicValue } from "./util/dynamicValue";
import { IDynamicTemplateStruct } from "./types/IDynamicTemplateStruct";
import { State } from "../State";

export class Template<
  T extends HTMLElement | SVGElement = HTMLElement | SVGElement
> implements BaseClass
{
  private updateFuncs: UpdateFunction[] = [];

  protected uuid: string;

  tag: string;
  element: T;
  childs: Template[];
  parent?: Template;

  //properties
  classList: ClassList;
  style: Style;
  attributes: Attributes;
  events: Events;
  id: ID;

  //

  _name = "Template";

  constructor(element: T) {
    this.uuid = generateUUID();
    this.element = element;
    this.childs = [];

    //attributes
    this.classList = new ClassList(this);
    this.style = new Style(this);
    this.attributes = new Attributes(this);
    this.events = new Events(this);
    this.id = new ID(this);

    // get attributes from element
    this.tag = element.tagName.toLowerCase();
    this.id.setId(element.id);
  }

  applyStruct(struct: IDynamicTemplateStruct) {
    if (struct.id) {
      this.id.dynamicId(struct.id);
    }

    if (struct.style) {
      this.style.dynamicStyle(struct.style);
    }

    if (struct.attributes) {
      this.attributes.dynamicAttributes(struct.attributes);
    }

    if (struct.events) {
      this.events.addEvents(struct.events);
    }

    if (struct.innerHTML) {
      this.dynamicInnerHTML(struct.innerHTML);
    }

    if (struct.childs) {
      this.dynamicChilds(struct.childs);
    }

    if (struct.watchSates) {
      this.initWatchStates(struct.watchSates);
    }
  }

  //innerHTML
  setInnerHTML(text: string) {
    this.element.innerHTML = text;
  }

  dynamicInnerHTML(data: IDynamicStatic<string>) {
    const target = this;
    dynamicValue(data, this, {
      deleteValue() {},
      setValue(value) {
        target.setInnerHTML(value);
      },
    });
  }

  //Childs

  dynamicChilds(data: IDynamicStatic<ITemplateChildStruct[]>) {
    const target = this;
    dynamicValue(data, this, {
      deleteValue(value) {
        target.deleteChilds();
      },
      setValue(value) {
        value.forEach((item: string) => {
          target.addChild(item);
        });
      },
    });
  }

  addChild(child: ITemplateChildStruct) {
    return createChild(this, child);
  }

  deleteChilds() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.childs = [];
  }

  //
  initWatchStates(states: State<any>[]) {
    states.forEach((state) => {
      state.onUpdate(() => {
        this.updateFuncs.forEach((func) => func.call());
      });
    });
  }

  addUpdateFunc(func: UpdateFunction) {
    this.updateFuncs.push(func);
  }
  //

  elemenInDom() {}
}
