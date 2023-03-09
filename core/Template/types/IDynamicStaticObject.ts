import { State } from "../../State";

export type IDynamicStaticObject<T> =
  | T
  | State<T>
  | (() => T)
  | {
      [K in keyof T]?: State<T[K]> | T[K] | (() => T[K]);
    };
