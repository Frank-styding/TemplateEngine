import { State } from "../../State";

export type IDynamicStaticObject<T> =
  | State<T>
  | (() => T)
  | {
      [K in keyof T]?: State<T[K]> | T[K] | (() => T[K]);
    };
