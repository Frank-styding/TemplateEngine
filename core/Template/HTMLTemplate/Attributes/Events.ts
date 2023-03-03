import { HTMLTemplate } from "../HTMLTemplate";
import { Base } from "./Base";

export class Events extends Base<{
  [K in keyof HTMLElementEventMap]?: (
    this: HTMLTemplate,
    ev: HTMLElementEventMap[K]
  ) => any;
}> {
  protected data: {
    [K in keyof HTMLElementEventMap]?: (
      this: HTMLTemplate,
      ev: HTMLElementEventMap[K]
    ) => any;
  } = {};

  addEvent<K extends keyof HTMLElementEventMap>(
    event: K,
    func: (this: HTMLTemplate, env: HTMLElementEventMap[K]) => any
  ) {
    this.data[event] = func.bind(this);
    this.template.element.addEventListener(event, (env: any) =>
      func.bind(this.template)(env)
    );
  }

  addEvents(data: {
    [K in keyof HTMLElementEventMap]?: (ev: HTMLElementEventMap[K]) => any;
  }) {
    Object.keys(data).forEach((key) => {
      this.addEvent(
        key as keyof HTMLElementEventMap,
        data[key as keyof HTMLElementEventMap] as (
          ev: HTMLElementEventMap[keyof HTMLElementEventMap]
        ) => any
      );
    });
  }
}
