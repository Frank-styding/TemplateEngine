import { Template, ITemplateStruct } from "../../core";

type ObjectsTypes =
  | Template
  | HTMLElement
  | ITemplateStruct
  | keyof HTMLElementTagNameMap;

export type StringTypes =
  | `q:${string}`
  | `qAll:${string}`
  | `.${string}`
  | `#${string}`
  | "$head"
  | "$body"
  | `${keyof HTMLElementTagNameMap}||${string}` //atributes
  | `textNode:${string}`;

export type IArgA = ObjectsTypes | StringTypes;
