import { IArgA } from "../types/IArgA";
import { IArgAString } from "../types/IArgAString";
import { IArgB } from "../types/IArgB";
import { IArgC } from "../types/IArgC";
import { stringId } from "./stringId";
import { stringClass } from "./stringClass";
import { stringQuery } from "./stringQuery";
import { stringQueryAll } from "./stringQueryAll";
import { stringAttributes } from "./stringAttributes";
import { TemplateFunction } from "../TemplateFunc";
import { stringTag } from "./stringTag";
import { Template } from "../../core/Template/Template";
import { IChildStruct } from "../../core/Template/types/IChildStruct";
import { stringBody } from "./stringBody";
import { stringHead } from "./stringHead";
import { funcComponent } from "./funcComponent";

export function funcString(
  res: any,
  argA: IArgA,
  argB: IArgB<IArgAString>,
  argC: IArgC<IArgAString>
) {
  if (res != null) return res;
  if (typeof argA != "string") return res;

  let component: any;
  if ((component = funcComponent(argA, argB as () => Template)))
    return component;

  const selector = argA.replace(/\((.|)+\)/g, "").replace(/\[(.|)+\]/g, "");
  let _res = null;
  _res = stringBody(_res, selector);
  _res = stringHead(_res, selector);
  _res = stringId(_res, selector);
  _res = stringQuery(_res, selector);
  _res = stringClass(_res, selector);
  _res = stringQueryAll(_res, selector);
  _res = stringTag(_res, selector);

  if (_res == null || Array.isArray(_res) || typeof _res != "object")
    return res;

  stringAttributes(_res, argA, argB);

  if (/\[(.|)+\]/g.test(argA)) {
    return TemplateFunction(_res as Template, argC);
  }

  return TemplateFunction(_res as Template, argB as IChildStruct[]);
}
