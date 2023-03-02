import { generateUUID } from "../utils/genereUUID";
import { BaseClass } from "./BaseClass";
import { Template } from "./Template";

export class TextTemplate extends Template implements BaseClass {
  uuid: string;
  _name: "TextTemplate";
  show: boolean;
  constructor(public element: Text) {
    super();
    this.uuid = generateUUID();
    this.show = false;
    this.tag = "Text";
  }
}
