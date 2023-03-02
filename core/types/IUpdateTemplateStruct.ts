import { Ref } from "../Ref";
import { Template } from "../Template";
import { ITemplateStruct } from "./ITemplateStruct";

export interface IUpdateTemplateStruct {
  className?: string;
  classList?: string[];
  id?: string;
  style?: Record<string, string>;
  attributes?: Record<string, any>;
  childs?: (
    | Template
    | ITemplateStruct
    | HTMLElement
    | Text
    | `textNode:${string}`
    | `template:${string}`
  )[];
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref<Template>;
  innerHTML?: string;
  HTMLElement?: HTMLElement;
  show?: boolean;
}
