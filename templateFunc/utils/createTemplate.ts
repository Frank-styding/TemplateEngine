import { HTMLTemplate, Template } from "../../core";
import { IArgB } from "../types/IArgB";

export function createTemplate(element: HTMLElement, b?: IArgB<HTMLElement>) {
  if (Template.register.has(element)) {
    return Template.register.get(element) as Template;
  }

  const template = Array.isArray(b)
    ? new HTMLTemplate(element, { childs: b })
    : new HTMLTemplate(element, b);

  Template.register.set(element, template);
  return template;
}
