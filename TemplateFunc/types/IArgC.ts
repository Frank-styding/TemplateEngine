import { IChildStruct } from "../core/Template/types/IChildStruct";
import { ITagMap } from "./types/ITagMap";
import { SelectorOne } from "./types/IArgAString";

export type IArgC<T> = T extends
  | `${SelectorOne | ITagMap} (${string}) [${string}]`
  | `${SelectorOne | ITagMap} [${string}]`
  ? IChildStruct[]
  : undefined;
