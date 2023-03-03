import { Template } from "../Template/Template";
import { ITemplateStruct } from "./ITemplateStruct";

export type ITemplateChildStruct =
  | Template
  | ITemplateStruct
  | HTMLElement
  | Text
  | `textNode:${string}`
  | `template:${string}`;
