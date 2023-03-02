import { TextTemplate } from "../../core";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringTextNode(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (!selector.startsWith("textNode:") || result != null) return result;

  const textNode = document.createTextNode(selector.replace("textNode:", ""));
  return new TextTemplate(textNode);
}
