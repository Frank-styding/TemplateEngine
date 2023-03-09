import { IChildStruct } from "../core/Template/types/IChildStruct";
import { IDynamicStruct } from "../core/Template/types/IDynamicStruct";
import { IEventFunc } from "../core/Template/types/IEventFunc";
import { IEventMap } from "../core/Template/types/IEventMap";
import { ITagMap } from "./types/ITagMap";
import { Template } from "../core/Template/Template";
import { SelectorOne } from "./types/IArgAString";

export type IArgB<T> = T extends
  | ITagMap
  | `${SelectorOne | ITagMap} (${string})`
  ? IDynamicStruct | IChildStruct[]
  : T extends
      | `${SelectorOne | ITagMap} [${string}]`
      | `${SelectorOne | ITagMap} (${string}) [${string}]`
  ? IEventFunc<keyof IEventMap>[] | IEventFunc<keyof IEventMap>
  : T extends `[${string}]`
  ? () => Template
  : T extends Template
  ?
      | IDynamicStruct
      | IChildStruct[]
      | IEventFunc<keyof IEventMap>[]
      | IEventFunc<keyof IEventMap>
  : undefined;
