import { Template, ITemplateStruct } from "../../core";

type ObjectsTypes = Template | HTMLElement | ITemplateStruct;

export type StringTypes =
  | `q:${string}`
  | `qAll:${string}`
  | `.${string}`
  | `#${string}`
  | "$head"
  | "$body"
  | keyof HTMLElementTagNameMap
  | `${keyof HTMLElementTagNameMap}||${string}||`
  | `textNode:${string}`;

export type EventString =
  | `${keyof HTMLElementTagNameMap}||${string}||${`event`}:${`click`}`
  | `${keyof HTMLElementTagNameMap}||event:${string}`;

export type IArgA = ObjectsTypes | StringTypes | EventString;
