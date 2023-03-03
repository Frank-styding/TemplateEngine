import { Template } from "./Template/Template";

export function render(template: Template | Template[]) {
  if (Array.isArray(template)) {
    template.forEach((template) => template.elementInDom());
    return;
  }
  template.elementInDom();
}
