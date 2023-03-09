import { BaseClass } from "./BaseClass";
import { IEventFunc } from "../types/IEventFunc";
import { IEventMap } from "../types/IEventMap";
import { IEventsData } from "../types/IEventsData";

export class Events extends BaseClass<IEventsData> {
  protected data: IEventsData = {};

  addEvent<K extends keyof IEventMap>(event: K, func: IEventFunc<K>) {
    this.data[event] = func.bind(this);
    this.template.element.addEventListener(event, (env: any) =>
      func.bind(this.template)(env)
    );
  }

  addEvents(data: IEventsData) {
    Object.keys(data).forEach((key) => {
      this.addEvent(
        key as keyof IEventMap,
        data[key as keyof IEventMap] as IEventFunc<keyof IEventMap>
      );
    });
  }
}
