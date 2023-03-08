import { IDynamicStatic } from "../types/IDynamicStatic";
import { dynamicValue } from "../util/dynamicValue";
import { BaseClass } from "./BaseClass";

export class ClassList extends BaseClass<Set<string>> {
  protected data: Set<string> = new Set<string>();

  toggleClassName(name: string) {
    if (this.data.has(name)) {
      this.data.delete(name);
    } else {
      this.data.add(name);
    }
    this.template.element.classList.toggle(name);
  }

  addClassName(name: string) {
    this.data.add(name);
    this.template.element.classList.add(name);
  }

  removeClassName(name: string) {
    this.data.delete(name);
    this.template.element.classList.remove(name);
  }

  dynamicClassName(data: IDynamicStatic<string>) {
    const target = this;
    dynamicValue(data, this.template, {
      deleteValue(value) {
        target.removeClassName(value);
      },
      setValue(value) {
        target.addClassName(value);
      },
    });
  }

  addClassList(names: string[]) {
    if (names.length == 0) return;
    names.forEach((name) => this.addClassName(name));
  }

  removeClassList(names: string[]) {
    if (names.length == 0) return;
    names.forEach((name) => this.removeClassName(name));
  }

  dynamicClassList(data: IDynamicStatic<string[]>) {
    const target = this;
    dynamicValue(data, this.template, {
      setValue(value) {
        target.removeClassList(value);
      },
      deleteValue(value) {
        target.removeClassList(value);
      },
    });
  }
}
