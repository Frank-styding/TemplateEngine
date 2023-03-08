import { Template } from "./Template/Template";

export class Component {
  id: string;
  childs: Component[] = [];
  constructor(public name: string, public template: Template) {}

  addChild(component: Component) {
    this.template.addChild(component.template);
    this.childs.push(component);
  }

  elementInDom() {
    this.template.elemenInDom();
    this.childs.forEach((child) => {
      child.elementInDom();
    });
  }
}
