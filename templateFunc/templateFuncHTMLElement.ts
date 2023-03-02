import { templateFunc } from "./templateFunc";
import { IArgB } from "./types/IArgB";
import { createTemplate } from "./utils/createTemplate";

export function templateFuncHTMLElement(
  result: any,
  a: any,
  b?: IArgB<HTMLElement>
) {
  if (result != null || !(a instanceof HTMLElement)) return result;

  const template = createTemplate(a);

  if (b != undefined) {
    return templateFunc(template, b);
  }

  return template;
}
