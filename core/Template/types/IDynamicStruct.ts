import { IDynamicUpdateStruct } from "./IDynamicUpdateStruct";
export interface IDynamicStruct extends IDynamicUpdateStruct {
  tag: keyof HTMLElementTagNameMap;
}
