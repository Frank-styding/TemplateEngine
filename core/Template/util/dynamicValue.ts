import { State } from "../../State";
import { equal } from "../../utils/equal";
import { Template } from "../Template";
import { IDynamicStatic } from "../types/IDynamicStatic";
import { UpdateFunction } from "../UpdateFunction";
import { IUpdateValueFuncs } from "./IUpdateValueFuncs";

export const dynamicValue = (
  data: IDynamicStatic<any>,
  template: Template,
  { deleteValue, setValue }: IUpdateValueFuncs
) => {
  if (typeof data == "function") {
    const func = new UpdateFunction((prev) => {
      const value = data();
      if (equal(prev, value)) return value;
      if (prev) deleteValue(prev);
      setValue(value);
      return value;
    });
    func.call();
    template.addUpdateFunc(func);
    return;
  }

  if (data instanceof State) {
    setValue(data.getString());

    data.onUpdate((nValue, prev) => {
      if (prev) deleteValue(prev);
      if (data.prefix) {
        setValue(data.prefix(nValue));
      }
      setValue(nValue);
    });

    return;
  }

  setValue(data);
};
