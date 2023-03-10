import { State } from "../../State";
import { Template } from "../Template";
import { IDynamicStatic } from "../types/IDynamicStatic";
import { IDynamicStaticObject } from "../types/IDynamicStaticObject";
import { dynamicValue } from "./dynamicValue";
import { IUpdateObjectFuncs } from "./IUpdateObjectFuncs";
import { IUpdateValueFuncs } from "./IUpdateValueFuncs";

export const dynamicObject = <T>(
  template: Template,
  data: IDynamicStaticObject<T>,
  funcs: IUpdateValueFuncs & IUpdateObjectFuncs
) => {
  dynamicValue(
    template,
    data as IDynamicStatic<any>,
    funcs as IUpdateValueFuncs
  );

  if (typeof data != "object" || data instanceof State || Array.isArray(data))
    return;

  Object.keys(data).forEach((key) => {
    dynamicValue(data[key], template, {
      deleteValue: (value: any) => funcs.deleteKey(key, value),
      setValue: (value: any) => funcs.setKey(key, value),
    });
  });
};
