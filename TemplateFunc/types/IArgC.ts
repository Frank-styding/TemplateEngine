import { IChildStruct } from "../../core/Template/types/IChildStruct";
import { ITagMap } from "./ITagMap";
import { SelectorOne } from "./IArgAString";

export type IArgC<T> = T extends
  | `${SelectorOne | ITagMap} (${string}) [${string}]`
  | `${SelectorOne | ITagMap} [${string}]`
  ? IChildStruct[]
  : undefined;
