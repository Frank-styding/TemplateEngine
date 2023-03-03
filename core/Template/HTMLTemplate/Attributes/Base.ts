import { HTMLTemplate } from "../HTMLTemplate";

export class Base<T> {
  protected data: T;
  constructor(protected template: HTMLTemplate) {}

  get(): T {
    return this.data;
  }
}
