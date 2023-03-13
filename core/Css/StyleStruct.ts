import { State } from "../State";

export type StyleStruct = {
  [K in string]?: string | State<any> | Record<string, StyleStruct> | undefined;
} & {
  _?: Record<string, StyleStruct>;
};
