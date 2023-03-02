import { HTMLTemplate, ITemplateStruct } from "../core";
import { IArgB } from "./types/IArgB";
import { addChilds } from "./utils/addChilds";

export function templateFuncTemplate(
  result: any,
  a: any,
  b?: IArgB<HTMLTemplate>
) {
  if (result != null || typeof a != "object" || a._name != "HTMLTemplate")
    return result;

  const template = a as HTMLTemplate;

  if (b == undefined) {
    return template;
  }

  if (Array.isArray(b)) {
    addChilds(template, b);
  } else {
    template.applyStruct(b as ITemplateStruct);
  }

  return template;
}
