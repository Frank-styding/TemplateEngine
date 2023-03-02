import { HTMLTemplate } from "../HTMLTemplate";
import { Ref } from "../Ref";
import { State } from "../State";
import { Template } from "../Template";
import { DinamicAndStatic } from "./DinamicAndStatic";
import { ITemplateStruct } from "./ITemplateStruct";

export interface IUpdateTemplateStruct {
  className?: DinamicAndStatic<string>;
  classList?: DinamicAndStatic<string[]>;
  id?: DinamicAndStatic<string>;

  style?:
    | Record<string, DinamicAndStatic<string>>
    | State<Record<string, string>>;

  attributes?:
    | Record<string, DinamicAndStatic<string>>
    | State<Record<string, string>>;

  childs?: DinamicAndStatic<
    (
      | Template
      | ITemplateStruct
      | HTMLElement
      | Text
      | `textNode:${string}`
      | `template:${string}`
    )[]
  >;
  innerHTML?: DinamicAndStatic<string>;
  show?: DinamicAndStatic<boolean>;
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref<HTMLTemplate>;
  watchStates?: State<any>[];
  //HTMLElement?: HTMLElement;
}
