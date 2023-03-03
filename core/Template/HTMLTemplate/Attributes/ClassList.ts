import { State } from "../../../State";
import { DynamicStaticState } from "../../../types/DynamicStaticState";
import { UpdateFunction } from "../../UpdateFunction";
import { Base } from "./Base";

export class ClassList extends Base<Set<string>> {
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

  addClassNameDynamic(value: DynamicStaticState<string>) {
    if (value instanceof State) {
      this.data.add(value.value);
      value.callback = (nValue, prev) => {
        if (prev) this.removeClassName(prev);
        this.addClassName(nValue);
      };
      return;
    }

    if (typeof value == "function") {
      const func = new UpdateFunction<string>((prev) => {
        const _value = value();
        if (prev == _value) return _value;
        if (prev) this.removeClassName(prev);

        this.addClassName(_value);

        return _value;
      });
      func.call();

      this.template.updateFuncs.push(func);
      return;
    }
    this.addClassName(value);
  }

  removeClassName(name: string) {
    this.data.delete(name);
    this.template.element.classList.remove(name);
  }

  addClassList(names: string[]) {
    if (names.length == 0) return;
    names.forEach((name) => this.addClassName(name));
  }
  removeClassList(names: string[]) {
    if (names.length == 0) return;
    names.forEach((name) => this.removeClassName(name));
  }

  addClassListDynamic(names: DynamicStaticState<string[]>) {
    if (names instanceof State) {
      this.addClassList(names.value);

      names.callback = (nValue, prev) => {
        if (prev) this.removeClassList(prev);
        this.addClassList(nValue);
      };

      return;
    }

    if (typeof names == "function") {
      const func = new UpdateFunction<string[]>((prev) => {
        const _value = names();
        if (prev == _value) return _value;
        if (prev) this.removeClassList(prev);
        this.addClassList(_value);
        return _value;
      });
      func.call();

      this.template.updateFuncs.push(func);
      return;
    }

    this.addClassList(names);
  }
}
