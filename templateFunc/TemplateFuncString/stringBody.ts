import { templateFunc } from "../templateFunc";
import { StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";

export function stringBody(
  result: any,
  selector: string,
  b?: IArgB<StringTypes>
) {
  if (selector != "$body" || result != null) return result;
  return templateFunc(document.body, b);
}
