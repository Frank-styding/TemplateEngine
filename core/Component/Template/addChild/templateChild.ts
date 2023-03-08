import { Template } from "../Template";

export function addChildTemplate(_template: Template, res: any, child: any) {
  if (res != null) return res;

  if (!(child instanceof Template)) return res;

  child.parent = _template;
  _template.childs.push(child);
  _template.element.appendChild(child.element);
  return true;
}
