import { HTMLTemplate, ITemplateStruct, Template } from "../core";
import { IArgB } from "./types/IArgB";

export function templateFuncStruct(
  result: any,
  a: any,
  b?: IArgB<ITemplateStruct>
) {
  if (result != null || typeof a != "object" || a._name != undefined)
    return result;

  const struct = a as ITemplateStruct;
  const element = document.createElement(struct.tag);
  const template = new HTMLTemplate(element, struct);
  Template.register.set(element, template);

  return template;
}
