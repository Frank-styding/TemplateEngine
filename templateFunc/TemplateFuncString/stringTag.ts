import { templateFunc } from "../templateFunc";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";
import { setAttributesFromString } from "./setAttributesFromString";

export function stringTag(selector: string, a: string, b?: IArgB<StringTypes>) {
  const attributes = a.split("||")[1];
  const element = document.createElement(selector);
  const template = templateFunc(element, b);

  const { id, classNames } = setAttributesFromString(attributes);
  if (classNames) template.classList.addClassList(classNames);
  if (id) template.id.setId(id);

  return template;
}
