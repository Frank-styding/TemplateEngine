import { State } from "../State";

export type DynamicStaticState<T> = T | State<T> | (() => T);
