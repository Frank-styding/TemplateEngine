import { HTMLTemplate, ITemplateStruct, Template } from "../../core";

type ResultTemplate =
  | HTMLElement
  | ITemplateStruct
  | `#${string}`
  | `q:${string}`;

type ResultArrayTemplate = `.${string}` | `qAll:${string}`;

export type ITemplateFunc<T> = T extends ResultTemplate
  ? HTMLTemplate
  : T extends ResultArrayTemplate
  ? HTMLTemplate[]
  : T extends "$body"
  ? HTMLTemplate<HTMLBodyElement>
  : T extends "$head"
  ? HTMLTemplate<HTMLHeadElement>
  : T extends `${infer K extends keyof HTMLElementTagNameMap}||${string}`
  ? HTMLTemplate<HTMLElementTagNameMap[K]>
  : T extends `${`.${string}` | `#${string}`}::${
      | "id"
      | "classList"
      | "events"
      | "style"
      | "attributes"}`
  ? any
  : T extends keyof HTMLElementTagNameMap
  ? HTMLTemplate<HTMLElementTagNameMap[T]>
  : Template;
