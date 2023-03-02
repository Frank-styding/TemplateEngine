import { State } from "../State";

export type DinamicAndStatic<T> = T | State<T> | (() => T);
