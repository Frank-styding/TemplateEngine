import { generateUUID } from "../utils/genereUUID";
import { BaseClass } from "./BaseClass";

export class State<T> implements BaseClass {
  _name = "State";
  callback?: (value: T, preValue: T) => void;
  uuid: string;
  constructor(private _value: T) {
    this.uuid = generateUUID();
  }

  get value(): T {
    return this._value;
  }

  equal(a: any, b: any) {
    if (typeof a === "object" && typeof b === "object") {
      return JSON.stringify(a) === JSON.stringify(b);
    }
    return a == b;
  }

  set(value: T) {
    if (this.equal(this._value, value)) {
      return;
    }

    const prev = this._value;

    this._value = value;

    if (this.callback) {
      this.callback(value, prev);
    }
  }
}
