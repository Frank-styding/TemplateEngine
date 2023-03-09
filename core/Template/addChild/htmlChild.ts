import { Template } from "../Template";

export function addChildHTML(_template: Template, res: any, child: any) {
  if (res != null) return res;
  if (!(child instanceof HTMLElement)) return res;

  const template = new Template(child);
  _template.childs.push(template);
  _template.element.appendChild(child);

  return true;
}
