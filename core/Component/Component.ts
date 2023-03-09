import { Template } from "../Template/Template";
import { generateUUID } from "../utils/genereUUID";
export class Component {
  public readonly uuid: string;
  constructor(public readonly name: string, private template: Template) {
    this.uuid = generateUUID();
  }
}
