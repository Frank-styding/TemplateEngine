import {
  ITemplateChildStruct,
  IUpdateTemplateStruct,
  Template,
} from "../../core";

//if arg a create template the arg b can add childs or update properties

type TemplateArgA =
  | Template
  | HTMLElement
  | HTMLElementTagNameMap
  | "$body"
  | "$head"
  | `q:${string}`
  | `#${string}`
  | `textNode:${string}`
  | `${keyof HTMLElementTagNameMap}||${string}`;

export type IArgB<K> = K extends TemplateArgA
  ? ITemplateChildStruct[] | IUpdateTemplateStruct
  : undefined;
