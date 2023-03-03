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

  set(value: T) {
    if (value == this._value) {
      return;
    }
    const prev = this._value;

    this._value = value;

    if (this.callback) {
      this.callback(value, prev);
    }
  }
}
