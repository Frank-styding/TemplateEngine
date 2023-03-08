import { IDynamicStatic } from "../types/IDynamicStatic";
import { dynamicValue } from "../util/dynamicValue";
import { BaseClass } from "./BaseClass";

export class ID extends BaseClass<string | undefined> {
  protected data: string | undefined;

  setId(id: string) {
    if (id == "") {
      return;
    }
    this.data = id;
    this.template.element.id = id;
  }

  dynamicId(id: IDynamicStatic<string>) {
    const target = this;
    dynamicValue(id, this.template, {
      setValue(value) {
        target.setId(value);
      },
      deleteValue() {},
    });
  }
}
