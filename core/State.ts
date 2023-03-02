import { generateUUID } from "../utils/genereUUID";

export class State<T> {
  callback?: (preValue: T, value: T) => void;
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

    if (this.callback) {
      this.callback(this._value, value);
    }

    this._value = value;
  }
}
