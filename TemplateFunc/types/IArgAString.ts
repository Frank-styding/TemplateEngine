import { ITagMap } from "./ITagMap";

export type ISelectorOne = `#${string}` | `q:${string}`;
export type ISelectorList = `.${string}` | `qAll:${string}`;
export type IArgAString =
  | ITagMap
  | ISelectorOne
  | ISelectorList
  | `${ISelectorOne | ITagMap} (${string})`
  | `${ISelectorOne | ITagMap} [${string}]`
  | `${ISelectorOne | ITagMap} (${string}) [${string}]`
  | `[${string}]`;
