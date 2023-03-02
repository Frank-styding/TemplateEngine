import { Ref } from "../Ref";
import { Template } from "../Template";
import { ITemplateChildStruct } from "./ITemplateChildStruct";

export interface ITemplateStruct {
  tag: string;
  className?: string;
  classList?: string[];
  id?: string;
  style?: Record<string, string>;
  attributes?: Record<string, any>;
  childs?: ITemplateChildStruct[];
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref<Template>;
  innerHTML?: string;
  show?: boolean;
}
