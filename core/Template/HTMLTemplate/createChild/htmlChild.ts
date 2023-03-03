import { HTMLTemplate } from "../HTMLTemplate";

export function addChildHTML(_template: HTMLTemplate, res: any, child: any) {
  if (res != null) return res;
  if (!(child instanceof HTMLElement)) return res;
  const template = new HTMLTemplate(child, undefined, _template);

  _template.childs.push(template);
  _template.element.appendChild(child);
  return true;
}
