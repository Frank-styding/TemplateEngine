import { Template } from "../Template/Template";
import { generateUUID } from "../utils/genereUUID";
export class Component {
  public id: string;
  public uuid: string;
  constructor(public readonly name: string, public template: Template) {
    this.uuid = generateUUID();
  }
  setComponentId(id: string) {
    this.id = id;
  }
}
