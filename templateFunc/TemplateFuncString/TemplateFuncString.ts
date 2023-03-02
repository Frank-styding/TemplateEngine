import { stringBody } from "./stringBody";
import { stringHead } from "./stringHead";
import { stringID } from "./stringID";
import { IArgA, StringTypes } from "../types/IArgA";
import { IArgB } from "../types/IArgB";
import { stringClass } from "./stringClass";
import { stringQuery } from "./stringQuery";
import { stringQueryAll } from "./stringQueryAll";
import { stringTextNode } from "./stringTextNode";
import { stringTag } from "./stringTag";
import { HTMLTemplate, Template, TextTemplate } from "../../core";

export function templateFuncString(
  result: any,
  a: IArgA,
  b?: IArgB<StringTypes>
) {
  if (result != null || typeof a != "string") return result;

  const selector = a.replace(/(::|\|\|).+/, "");

  let res: HTMLTemplate | TextTemplate | HTMLTemplate[] | null = null;

  res = stringBody(res, selector, b);
  res = stringHead(res, selector, b);
  res = stringID(res, selector, b);
  res = stringClass(res, selector, b);
  res = stringQuery(res, selector, b);
  res = stringQueryAll(res, selector, b);
  res = stringTextNode(res, selector, b);

  if (res != null) {
    return res;
  }

  return stringTag(selector, a, b);
}
