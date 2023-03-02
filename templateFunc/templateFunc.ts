import { ITemplateStruct, Template } from "../core";
import { templateFuncHTMLElement } from "./templateFuncHTMLElement";
import { templateFuncRef } from "./templateFuncRef";
import { templateFuncString } from "./TemplateFuncString/TemplateFuncString";
import { templateFuncStruct } from "./templateFuncStruct";
import { templateFuncTemplate } from "./templateFuncTemplate";
import { IArgA, StringTypes } from "./types/IArgA";
import { IArgB } from "./types/IArgB";
import { ITemplateFunc } from "./types/ITFunc";

export function templateFunc<T extends IArgA>(
  a: T,
  b?: IArgB<T>
): ITemplateFunc<T> {
  let res: null | Template[] | Template = null;

  res = templateFuncString(res, a, b as IArgB<StringTypes>);
  res = templateFuncHTMLElement(res, a, b as IArgB<HTMLElement>);
  res = templateFuncStruct(res, a, b as IArgB<ITemplateStruct>);
  res = templateFuncTemplate(res, a, b as IArgB<Template>);

  templateFuncRef(res, a);

  return res as ITemplateFunc<T>;
}
