import { Template } from "../Template";
import { ITemplateStruct } from "./ITemplateStruct";

export type ITemplateChildStruct =
  | Template
  | ITemplateStruct
  | HTMLElement
  | string;
