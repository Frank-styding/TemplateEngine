import { ITagMap } from "./ITagMap";

export type SelectorOne = `#${string}` | `q:${string}`;
export type SelectorList = `.${string}` | `qAll:${string}`;
export type IArgAString =
  | ITagMap
  | SelectorOne
  | SelectorList
  | `${SelectorOne | ITagMap} (${string})`
  | `${SelectorOne | ITagMap} [${string}]`
  | `${SelectorOne | ITagMap} (${string}) [${string}]`
  | `[${string}]`;
