import { IArgA } from "./types/IArgA";
import { Template } from "../core/Template/Template";
import { IArgB } from "./types/IArgB";
import { IArgC } from "./types/IArgC";
import { TemplateFunction } from "./TemplateFunc";

export function funcHTML(
  res: any,
  argA: IArgA,
  argB: IArgB<HTMLElement>,
  argC: IArgC<HTMLElement>
) {
  if (res != null) return res;
  if (!(argA instanceof HTMLElement)) return res;

  return TemplateFunction(new Template(argA), argB);
}
