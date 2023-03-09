import { generateUUID } from "../utils/genereUUID";
import { BaseClass } from "../utils/BaseClass";
import { ClassList } from "./Properties/ClassList";
import { Style } from "./Properties/Style";
import { Attributes } from "./Properties/Attributes";
import { Events } from "./Properties/Events";
import { ID } from "./Properties/Id";
import { addChild } from "./addChild/addChild";
import { IChildStruct } from "./types/IChildStruct";
import { UpdateFunction } from "./UpdateFunction";
import { IDynamicStatic } from "./types/IDynamicStatic";
import { dynamicValue } from "./util/dynamicValue";
import { State } from "../State";
import { Show } from "./Properties/Show";
import { IDynamicUpdateStruct } from "./types/IDynamicUpdateStruct";

export class Template<
  T extends HTMLElement | SVGElement = HTMLElement | SVGElement
> implements BaseClass
{
  protected readonly uuid: string;
  private updateFuncs: UpdateFunction[] = [];

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
  show: Show;
  //

  _name = "Template";

  struct?: IDynamicUpdateStruct;

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
    this.show = new Show(this);

    // get attributes from element
    this.tag = element.tagName.toLowerCase();
    this.id.setId(element.id);
  }

  applyStruct(struct: IDynamicUpdateStruct) {
    this.struct = struct;
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

    if (struct.classList) {
      this.classList.dynamicClassList(struct.classList);
    }

    if (struct.className) {
      this.classList.dynamicClassName(struct.className);
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

  addChild(child: IChildStruct) {
    addChild(this, child);
  }

  deleteChilds() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.childs = [];
  }

  dynamicChilds(data: IDynamicStatic<IChildStruct[]>) {
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

  //state
  initWatchStates(states: State<any>[]) {
    states.forEach((state) => {
      state.onUpdate(() => {
        this.updateFuncs.forEach((func) => func.call());
      });
    });
  }

  //update functions
  addUpdateFunc(func: UpdateFunction) {
    this.updateFuncs.push(func);
  }

  //event on element is in dom
  _elemenInDom() {
    if (this.struct) {
      if (this.struct.show != undefined) {
        this.show.dynamicShow(this.struct.show);
      }
    }
    this.childs.forEach((child) => child._elemenInDom());
  }
}
