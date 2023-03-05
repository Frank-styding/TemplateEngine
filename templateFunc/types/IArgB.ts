import {
  HTMLTemplate,
  ITemplateChildStruct,
  IUpdateTemplateStruct,
  Template,
} from "../../core";

//if arg a create template the arg b can add childs or update properties

type TemplateArgA =
  | Template
  | HTMLElement
  | "$body"
  | "$head"
  | `q:${string}`
  | `#${string}`
  | `textNode:${string}`
  | keyof HTMLElementTagNameMap
  | `${keyof HTMLElementTagNameMap}||${string}||`;

export type IArgB<K> = K extends TemplateArgA
  ? ITemplateChildStruct[] | IUpdateTemplateStruct
  : K extends
      | `${infer U extends keyof HTMLElementTagNameMap}||${string}||event:${string}`
      | `${infer U extends keyof HTMLElementTagNameMap}||event:${string}`
  ? (this: HTMLTemplate<HTMLElementTagNameMap[U]>, e: any) => void
  : undefined;
