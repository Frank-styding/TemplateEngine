import { Component } from "./Component";
import { Template } from "./Template/Template";
import { generateUUID } from "./utils/genereUUID";

export class CreateComponent {
  private uuid: string;

  constructor(public name: string, private createTemplate: () => Template) {
    this.uuid = generateUUID();
  }

  get() {
    const template = this.createTemplate();
    const component = new Component(this.name, template);
    component.id = this.uuid;
    return component;
  }
}
