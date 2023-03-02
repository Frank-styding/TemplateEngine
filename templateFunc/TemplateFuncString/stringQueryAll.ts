import { HTMLTemplate } from "../../core";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringQueryAll(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (!selector.startsWith("qAll:") || result != null) return result;

  const queryAll = selector.replace("qAll:", "");
  const elements = document.querySelectorAll(queryAll);
  return Array.from(elements).map(
    (element) => new HTMLTemplate(element as HTMLElement)
  );
}
