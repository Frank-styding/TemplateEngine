import { generateUUID } from "./utils/genereUUID";
import { BaseClass } from "./utils/BaseClass";
import { equal } from "./utils/equal";

export class State<T = any> implements BaseClass {
  private uuid: string;
  private updateCallbacks: ((value: T, preValue: T) => void)[];
  prefix?: (value: any) => string;

  _name = "State";

  constructor(private _value: T) {
    this.uuid = generateUUID();
    this.updateCallbacks = [];
  }

  onUpdate(callback: (value: T, preValue: T) => void) {
    this.updateCallbacks.push(callback);
  }

  setPrefixString(func: (value: any) => string) {
    this.prefix = func;
  }

  set(value: T) {
    if (equal(this._value, value)) {
      return;
    }

    const prev = this._value;

    this._value = value;

    this.updateCallbacks.forEach((callback) => callback(value, prev));
  }

  get(): T {
    return this._value;
  }

  getString(): string {
    if (this.prefix) {
      return this.prefix(this._value);
    }
    return "" + this._value;
  }
}
