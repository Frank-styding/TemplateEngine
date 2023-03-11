import { IArgA } from "./types/IArgA";
import { Template } from "../core/Template/Template";
import { IArgB } from "./types/IArgB";
import { IArgC } from "./types/IArgC";

export function funcTemplate(
  res: any,
  argA: IArgA,
  argB: IArgB<Template>,
  argC: IArgC<Template>
) {
  if (res != null) return res;
  if (!(argA instanceof Template)) return res;

  if (argB) {
    if (Array.isArray(argB)) {
      argB.forEach((child) => argA.addChild(child));
    } else {
      argA.applyStruct(argB);
    }
  }

  return argA;
}
