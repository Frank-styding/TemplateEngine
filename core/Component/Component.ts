import { Template } from "../Template/Template";
import { generateUUID } from "../utils/genereUUID";
export class Component {
  public uuid: string;
  constructor(public readonly name: string, private template: Template) {}
  setUUID(uuid: string) {
    this.uuid = uuid;
  }
}
