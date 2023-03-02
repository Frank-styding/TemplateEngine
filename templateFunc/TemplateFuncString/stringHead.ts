import { HTMLTemplate } from "../../core";
import { templateFunc } from "../templateFunc";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringHead(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (selector != "$head" || result != null) return result;
  return templateFunc(document.head, b);
}
