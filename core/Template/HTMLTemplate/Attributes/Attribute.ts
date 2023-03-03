import { State } from "../../../State";
import { DynamicStaticState } from "../../../types/DynamicStaticState";
import { UpdateFunction } from "../../UpdateFunction";
import { Base } from "./Base";

export class Attributes extends Base<Record<string, string>> {
  protected data: Record<string, any> = {};

  setAttribute(name: string, value: string) {
    this.data[name] = value;
    this.template.element.setAttribute(name, value);
  }

  deleteAttribute(name: string, value: string) {
    this.data[name] = value;
    this.template.element.removeAttribute(name);
  }

  setAttributeDynamic(name: string, value: DynamicStaticState<string>) {
    if (value instanceof State) {
      this.setAttribute(name, value.value);
      value.callback = (nValue, prev) => {
        if (prev) this.deleteAttribute(name, prev);
        this.setAttribute(name, nValue);
      };
      return;
    }

    if (typeof value == "function") {
      const func = new UpdateFunction<string>((prev) => {
        const _value = value();
        if (prev == _value) return _value;
        if (prev) this.deleteAttribute(name, prev);

        this.setAttribute(name, _value);
        return _value;
      });
      func.call();
      this.template.updateFuncs.push(func);
      return;
    }

    this.setAttribute(name, value);
  }

  setAttributes(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.setAttribute(key, data[key]);
    });
  }

  deleteAttributes(data: Record<string, string>) {
    Object.keys(data).forEach((key) => {
      this.deleteAttribute(key, data[key]);
    });
  }

  setAttributesDynamic(
    data:
      | Record<string, DynamicStaticState<string>>
      | State<Record<string, string>>
      | (() => Record<string, string>)
  ) {
    if (data instanceof State) {
      this.setAttributes(data.value);
      data.callback = (nValue, prev) => {
        if (prev) this.deleteAttributes(prev);
        this.setAttributes(nValue);
      };
      return;
    }

    if (typeof data == "function") {
      const func = new UpdateFunction<Record<string, string>>((prev) => {
        const _value = data();
        if (prev == _value) return _value;
        if (prev) this.deleteAttributes(prev);

        this.setAttributes(_value);
        return _value;
      });
      func.call();
      this.template.updateFuncs.push(func);
      return;
    }

    Object.keys(data).forEach((key) => {
      this.setAttributeDynamic(key, data[key]);
    });
  }
}
