import { Template } from "../Template";
import { ITemplateStruct } from "../types/ITemplateStruct";

export function addChildTemplateStruct(
  _template: Template,
  res: any,
  child: any
) {
  if (res != null) return res;

  if (typeof child != "object") return res;
  if (child instanceof Template) return res;

  const struct = child as ITemplateStruct;
  const element = document.createElement(struct.tag);
  const template = new Template(element);

  _template.element.appendChild(template.element);
  _template.childs.push(template);

  template.applyStruct(struct);

  return true;
}
