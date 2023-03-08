import { Template } from "../Template";

export class BaseClass<T> {
  protected data: T;

  constructor(protected template: Template) {}

  get(): T {
    return this.data;
  }
}
