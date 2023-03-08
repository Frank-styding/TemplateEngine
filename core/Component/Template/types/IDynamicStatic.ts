import { State } from "../../State";

export type IDynamicStatic<T> = T extends infer K | undefined
  ? (() => K) | State<K> | K
  : (() => T) | State<T> | T;
