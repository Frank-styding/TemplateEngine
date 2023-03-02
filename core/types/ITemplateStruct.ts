import { HTMLTemplate } from "../HTMLTemplate";
import { Ref } from "../Ref";
import { State } from "../State";
import { Template } from "../Template";
import { DinamicAndStatic } from "./DinamicAndStatic";
import { ITemplateChildStruct } from "./ITemplateChildStruct";

export interface ITemplateStruct {
  tag: string;
  className?: DinamicAndStatic<string>;
  classList?: DinamicAndStatic<string[]>;
  id?: DinamicAndStatic<string>;
  style?:
    | Record<string, DinamicAndStatic<string>>
    | State<Record<string, string>>;
  attributes?:
    | Record<string, DinamicAndStatic<string>>
    | State<Record<string, string>>;
  childs?: DinamicAndStatic<ITemplateChildStruct[]>;
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref<HTMLTemplate>;
  innerHTML?: DinamicAndStatic<string>;
  show?: DinamicAndStatic<boolean>;
  watchStates?: State<any>[];
}
