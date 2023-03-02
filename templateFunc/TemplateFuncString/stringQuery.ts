import { templateFunc } from "../templateFunc";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringQuery(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (!selector.startsWith("q:") || result != null) return result;

  const query = selector.replace("q:", "");
  const element = document.querySelector(query);

  if (element == null) {
    throw new Error("Could not find element" + query);
  }

  return templateFunc(element as HTMLElement, b);
}
