import { Template } from "../Template";
import { IDynamicStruct } from "../types/IDynamicStruct";

export function addChildTemplateStruct(
  _template: Template,
  res: any,
  child: any
) {
  if (res != null) return res;

  if (typeof child != "object") return res;
  if (child instanceof Template) return res;

  const struct = child as IDynamicStruct;
  const element = document.createElement(struct.tag);
  const template = new Template(element);

  template.parent = _template;
  _template.element.appendChild(template.element);
  _template.childs.push(template);

  template.applyStruct(struct);

  return true;
}
