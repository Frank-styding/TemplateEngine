import { IChildStruct } from "../../core/Template/types/IChildStruct";
import { IDynamicUpdateStruct } from "../../core/Template/types/IDynamicUpdateStruct";
import { IEventFunc } from "../../core/Template/types/IEventFunc";
import { IEventMap } from "../../core/Template/types/IEventMap";
import { ITagMap } from "./ITagMap";
import { Template } from "../../core/Template/Template";
import { ISelectorOne } from "./IArgAString";

export type IArgB<T> = T extends
  | ITagMap
  | `${ISelectorOne | ITagMap} (${string})`
  ? IDynamicUpdateStruct | IChildStruct[]
  : T extends
      | `${ISelectorOne | ITagMap} [${string}]`
      | `${ISelectorOne | ITagMap} (${string}) [${string}]`
  ? IEventFunc<keyof IEventMap>[] | IEventFunc<keyof IEventMap>
  : T extends `[${string}]`
  ? (arg?: Record<string, any>) => Template
  : T extends Template | ISelectorOne
  ? IChildStruct[]
  : undefined;
