import { templateFunc } from "../templateFunc";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringID(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (!selector.startsWith("#") || result != null) return result;
  const id = selector.replace("#", "");
  const element = document.getElementById(id) as HTMLElement;
  if (element == null) {
    throw new Error("Could not find element" + id);
  }
  return templateFunc(element, b);
}
