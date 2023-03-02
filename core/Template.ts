import { generateUUID } from "../utils/genereUUID";
import { BaseClass } from "./BaseClass";
//import { ITemplateStruct } from "../types/ITemplateStruct";
/* import { TextTemplate } from "./TextTemplate";
import { HTMLTemplate } from "./HTMLTemplate"; */

export class Template<T extends Node = Node> implements BaseClass {
  static register: Map<HTMLElement, Template> = new Map();

  tag: string;

  element: T;

  childs: Template[];

  uuid: String;

  parent?: Template;

  _name = "Template";

  show: boolean;

  constructor() {
    this.uuid = generateUUID();
    this.childs = [];
    this.show = true;
  }

  setShowProperty(show: boolean) {
    if (this.parent == undefined) return;
    this.show = show;

    if (show) {
      const childs = this.parent.childs.filter(
        (item) => item.show || item == this
      );

      const idx = childs.indexOf(this);
      if (idx == 0) {
        this.parent.element.insertBefore(this.element, childs[1].element);
        return;
      }

      if (idx == childs.length - 1) {
        this.parent.element.appendChild(this.element);
        return;
      }
      this.parent.element.insertBefore(this.element, childs[idx + 1].element);
      return;
    }

    this.parent.element.removeChild(this.element);
  }
}
