import { HTMLTemplate } from "../../core";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringClass(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (!selector.startsWith(".") || result != null) return result;

  const className = selector.replace("class:", "");
  const elements = document.getElementsByClassName(className);

  return Array.from(elements).map(
    (element) => new HTMLTemplate(element as HTMLElement)
  );
}
