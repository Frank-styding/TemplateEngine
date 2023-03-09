import { State } from "../../State";

export type IDynamicStatic<T> = (() => T) | State<T> | T;
