import { IEventFunc } from "./IEventFunc";
import { IEventMap } from "./IEventMap";

export type IEventsData = {
  [K in keyof IEventMap]?: IEventFunc<K>;
};
