import { IDynamicStruct } from "../core/Template/types/IDynamicStruct";
import { IArgA } from "./types/IArgA";
import { Template } from "../core/Template/Template";
import { IArgAString } from "./types/IArgAString";
import { IArgB } from "./types/IArgB";
import { IArgC } from "./types/IArgC";
import { funcStruct } from "./funcStruct";

function funcHTML(
  res: any,
  argA: IArgA,
  argB: IArgB<HTMLElement>,
  argC: IArgC<HTMLElement>
) {
  if (res != null) return res;
  if (!(argA instanceof HTMLElement)) return res;

  return new Template(argA);
}

function stringId(res: any, selector: string, argB: IArgB<IArgAString>) {
  if (res != null) return res;
  if (!selector.startsWith("#")) return res;

  const element = document.getElementById(selector.replace("#", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  const template = new Template(element);

  if (typeof argB === "object") {
    template.applyStruct(argB as IDynamicStruct);
  }

  return TemplateFunction(template, argB);
}

function stringClass(res: any, selector: string, argB: IArgB<IArgAString>) {
  if (res != null) return res;
  if (!selector.startsWith("#")) return res;

  const element = document.getElementsByClassName(selector.replace(".", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  return Array.from(element).map(
    (_element) => new Template(_element as HTMLElement)
  );
}

function stringQuery(res: any, selector: string, argB: IArgB<IArgAString>) {
  if (res != null) return res;
  if (!selector.startsWith("q:")) return res;

  const element = document.querySelector(selector.replace("q:", ""));
  if (element == null) {
    throw new Error(`Element not found: ${selector}`);
  }

  //return fun new Template(element as HTMLElement);
}

function funcString(
  res: any,
  argA: IArgA,
  argB: IArgB<IArgAString>,
  argC: IArgC<IArgAString>
) {
  if (res != null) return res;
  if (typeof argA != "string") return res;

  const selector = argA.replace(/\((.|)+\)/g, "").replace(/\[(.|)+\]/g, "");

  let _res = null;
  _res = stringId(_res, selector, argB);
  _res = stringClass(_res, selector, argB);
  _res = stringQuery(_res, selector, argB);
}

function funcTemplate(res: any, argA: IArgA, argB: IArgB<IArgAString>) {
  if (res != null) return res;
  if (!(argA instanceof Template)) return res;
}
export function TemplateFunction<T extends IArgA>(
  argA: T,
  argB?: IArgB<T>,
  argC?: IArgC<T>
) {
  let res: any = null;
  res = funcString(
    res,
    argA,
    argB as IArgB<IArgAString>,
    argC as IArgC<IArgAString>
  );

  res = funcHTML(
    res,
    argA,
    argB as IArgB<HTMLElement>,
    argC as IArgC<HTMLElement>
  );

  res = funcStruct(
    res,
    argA,
    argB as IArgB<IDynamicStruct>,
    argC as IArgC<IDynamicStruct>
  );

  return res;
}
