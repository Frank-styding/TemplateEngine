import { TextTemplate } from "../../TextTemplate";
import { HTMLTemplate } from "../HTMLTemplate";

export function addChildString(_template: HTMLTemplate, res: any, child: any) {
  if (res != null) return res;
  if (typeof child != "string") return res;

  if (child.startsWith("textNode:")) {
    const data = child.replace("textNode:", "");
    const text = document.createTextNode(data);
    _template.childs.push(new TextTemplate(text));
    _template.element.appendChild(text);
  }

  return true;
}
