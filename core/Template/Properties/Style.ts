import { IDynamicStaticObject } from "../types/IDynamicStaticObject";
import { dynamicObject } from "../util/dynamicObject";
import { BaseClass } from "./BaseClass";

export class Style extends BaseClass<Record<string, string>> {
  protected data: Record<string, string> = {};

  removeStyle(name: string) {
    delete this.data[name];
    this.template.element.style.removeProperty(name);
    return this;
  }

  setStyle(name: string, value: string) {
    const match = name.match(/([a-z][A-Z])/g);
    if (match != null) {
      match.forEach((item) => {
        const replaceValue = item[0] + "-" + item[1].toLowerCase();
        name = name.replace(item, replaceValue);
      });
    }

    this.data[name] = value;
    this.template.element.style.setProperty(name, value);

    return this;
  }

  dynamicStyle(data: IDynamicStaticObject<Record<string, string>>) {
    const target = this;
    dynamicObject(this.template, data, {
      deleteKey(key, value) {
        target.removeStyle(key);
      },
      deleteValue(value) {
        target.removeStyles(value);
      },
      setKey(key, value) {
        target.setStyle(key, value);
      },
      setValue(value) {
        target.setStyles(value);
      },
    });
  }

  setStyles(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.setStyle(key, data[key]);
    });
    return this;
  }

  removeStyles(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.removeStyle(key);
    });
  }
}
