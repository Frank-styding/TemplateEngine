import { State } from "../../../State";
import { DynamicStaticState } from "../../../types/DynamicStaticState";
import { UpdateFunction } from "../../UpdateFunction";
import { Base } from "./Base";

export class Style extends Base<Record<string, string>> {
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

  setDinamicStyle(name: string, value: DynamicStaticState<string>) {
    if (value instanceof State) {
      this.setStyle(name, value.value);

      value.callback = (value) => {
        this.setStyle(name, value);
      };

      return;
    }

    if (typeof value == "function") {
      const func = new UpdateFunction<string>((prev) => {
        const _value = value();
        if (_value == prev) return _value;

        if (prev) this.removeStyle(prev);

        this.setStyle(name, _value);
        return _value;
      });
      func.call();
      this.template.updateFuncs.push(func);
      return;
    }

    this.setStyle(name, value);
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

  setDynamicStyles(
    data:
      | Record<string, DynamicStaticState<string>>
      | State<Record<string, string>>
      | (() => Record<string, string>)
  ) {
    if (data instanceof State) {
      this.setStyles(data.value);
      data.callback = (value, prev) => {
        if (prev) this.removeStyles(prev);
        this.setStyles(value);
      };
      return;
    }

    if (typeof data == "function") {
      const func = new UpdateFunction<Record<string, string>>((prev) => {
        const _value = data();
        if (_value == prev) return _value;
        if (prev) this.removeStyles(prev);

        this.setStyles(_value);
        return _value;
      });
      func.call();

      this.template.updateFuncs.push(func);
      return;
    }

    Object.keys(data).forEach((key) => {
      this.setDinamicStyle(key, data[key]);
    });
  }
}
