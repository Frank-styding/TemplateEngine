import { templateFunc } from "../templateFunc";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";
import { setAttributesFromString } from "./setAttributesFromString";

function addProperties(element: HTMLElement, b?: IArgB<StringTypes>) {
  return typeof b == "function"
    ? templateFunc(element)
    : templateFunc(element, b);
}

export function stringTag(selector: string, a: string, b?: IArgB<StringTypes>) {
  const properties = a.split("||");
  properties.shift();

  const element = document.createElement(selector);
  const template = addProperties(element, b);

  const { id, classNames, events, innerHTML } = setAttributesFromString(a, b);

  if (classNames) template.classList.addClassList(classNames);
  if (id) template.id.setId(id);
  if (events) template.events.addEvents(events);
  if (innerHTML) template.setInnerHTML(innerHTML);

  return template;
}
