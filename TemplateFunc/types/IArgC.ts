import { IChildStruct } from "../../core/Template/types/IChildStruct";
import { ITagMap } from "./ITagMap";
import { ISelectorOne } from "./IArgAString";

export type IArgC<T> = T extends
  | `${ISelectorOne | ITagMap} (${string}) [${string}]`
  | `${ISelectorOne | ITagMap} [${string}]`
  ? IChildStruct[]
  : undefined;
