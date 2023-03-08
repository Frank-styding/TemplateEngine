import { IDynamicStaticObject } from "../types/IDynamicStaticObject";
import { dynamicObject } from "../util/dynamicObject";
import { BaseClass } from "./BaseClass";

export class Attributes extends BaseClass<Record<string, string>> {
  protected data: Record<string, any> = {};

  setAttribute(name: string, value: string) {
    this.data[name] = value;
    this.template.element.setAttribute(name, value);
  }

  deleteAttribute(name: string) {
    delete this.data[name];
    this.template.element.removeAttribute(name);
  }

  setAttributes(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.setAttribute(key, data[key]);
    });
  }

  deleteAttributes(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.deleteAttribute(key);
    });
  }

  dynamicAttributes(data: IDynamicStaticObject<Record<string, string>>) {
    const target = this;
    dynamicObject(this.template, data, {
      setKey(key, value) {
        target.setAttribute(key, value);
      },
      setValue(value) {
        target.setAttributes(value);
      },
      deleteKey(key, value) {
        target.deleteAttribute(key);
      },
      deleteValue(value) {
        target.deleteAttributes(value);
      },
    });
  }
}
