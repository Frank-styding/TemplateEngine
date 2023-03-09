import { State } from "../../State";
import { Template } from "../Template";
import { IDynamicStatic } from "../types/IDynamicStatic";
import { IDynamicStaticObject } from "../types/IDynamicStaticObject";
import { dynamicValue } from "./dynamicValue";
import { IUpdateObjectFuncs } from "./IUpdateObjectFuncs";
import { IUpdateValueFuncs } from "./IUpdateValueFuncs";

export const dynamicObject = <T extends Record<string, any>>(
  template: Template,
  data: IDynamicStaticObject<T>,
  funcs: IUpdateValueFuncs & IUpdateObjectFuncs
) => {
  dynamicValue(
    data as IDynamicStatic<any>,
    template,
    funcs as IUpdateValueFuncs
  );

  if (typeof data != "object" || data instanceof State || Array.isArray(data))
    return;

  Object.keys(data).forEach((key) => {
    dynamicValue(data[key as keyof T], template, {
      deleteValue: (value: any) => funcs.deleteKey(key, value),
      setValue: (value: any) => funcs.setKey(key, value),
    });
  });
};
