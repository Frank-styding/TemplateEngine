import { BaseClass } from "./BaseClass";
import { Template } from "./Template/Template";
import { generateUUID } from "../utils/genereUUID";

export class Ref<T extends Template> implements BaseClass {
  _template?: T;
  uuid: string;
  _name = "Ref";
  constructor() {
    this.uuid = generateUUID();
  }

  get template() {
    return this._template;
  }
}
