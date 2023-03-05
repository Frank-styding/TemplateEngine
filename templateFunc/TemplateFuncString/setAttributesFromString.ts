import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

function getEvent(data: undefined | string, b: (() => void) | string) {
  if (data == undefined) return {};
  if (!data.startsWith("event:")) return {};
  if (typeof b !== "function") return {};
  const events: Record<string, any> = {};
  events[data.replace("event:", "")] = b;
  return events;
}

function getProperty(data: string | undefined, regex: RegExp, replace: string) {
  if (data == undefined) return;
  if (data.startsWith("event")) return;
  const match = data.match(regex);
  if (match == null) return;
  return match[0].replace(replace, "");
}

function getProperties(data: string | undefined) {
  if (data == undefined) return {};
  if (data.startsWith("event")) return {};

  const id = getProperty(data, /id=[a-zA-Z0-9_]+/g, "id=");
  const classNamesString = getProperty(data, /class=[a-zA-Z0-9_]+/g, "class=");
  const innerHTMLString = getProperty(data, /\$=\[[a-zA-Z\/\+\- ]+\]/g, "$=");
  const classNames = classNamesString ? classNamesString.split("/") : undefined;
  const innerHTML = innerHTMLString
    ? innerHTMLString.replace(/\[|\]/g, "")
    : undefined;

  return { id, classNames, innerHTML };
}

export function setAttributesFromString(
  a: string,
  b: IArgB<StringTypes>
): {
  id?: string;
  classNames?: string[];
  innerHTML?: string;
  events?: Record<string, any>;
} {
  let propertieString = a.split("||").filter((a) => a != "");
  propertieString.shift();

  if (propertieString.length === 1) {
    const event = getEvent(propertieString[0], b as () => void);
    const properties = getProperties(propertieString[0]);

    return { ...properties, events: event };
  }

  const properties = getProperties(propertieString[0]);
  const event = getEvent(propertieString[1], b as () => void);

  return { ...properties, events: event };
}
