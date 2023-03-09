import { IDynamicStruct } from "../core/Template/types/IDynamicStruct";
import { IArgA } from "./types/IArgA";
import { Template } from "../core/Template/Template";
import { IArgB } from "./types/IArgB";
import { IArgC } from "./types/IArgC";

export function funcStruct(
  res: any,
  argA: IArgA,
  argB: IArgB<IDynamicStruct>,
  argC: IArgC<IDynamicStruct>
) {
  if (res != null) return res;
  if (argA instanceof HTMLElement) return res;
  if (typeof argA != "object" || argA instanceof Template) return res;
  const element = document.createElement(argA.tag);
  const template = new Template(element);
  template.applyStruct(argA);
  return argA;
}
