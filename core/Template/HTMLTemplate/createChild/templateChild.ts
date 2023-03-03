import { Template } from "../../Template";
import { HTMLTemplate } from "../HTMLTemplate";

export function addChildTemplate(
  _template: HTMLTemplate,
  res: any,
  child: any
) {
  if (res != null) return res;

  if (!(child instanceof Template)) return res;

  child.parent = _template;
  _template.childs.push(child);
  _template.element.appendChild(child.element);
  return true;
}
