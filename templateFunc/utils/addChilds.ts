import {
  HTMLTemplate,
  ITemplateChildStruct,
  IUpdateTemplateStruct,
} from "../../core";

export function addChilds(
  template: HTMLTemplate[] | HTMLTemplate,
  b: ITemplateChildStruct[] | IUpdateTemplateStruct
) {
  if (Array.isArray(template) || !Array.isArray(b)) return;
  b.forEach((child) => template.addChild(child));
}
