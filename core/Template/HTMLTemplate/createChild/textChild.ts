import { TextTemplate } from "../../TextTemplate";
import { HTMLTemplate } from "../HTMLTemplate";

export function addChildText(_template: HTMLTemplate, res: any, child: any) {
  if (res != null) return res;

  if (!(child instanceof Text)) return res;

  _template.childs.push(new TextTemplate(child));
  _template.element.appendChild(child);

  return true;
}
