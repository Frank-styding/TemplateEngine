import { HTMLTemplate } from "../Template/HTMLTemplate/HTMLTemplate";
import { Ref } from "../Ref";
import { State } from "../State";
import { Template } from "../Template/Template";
import { DynamicStaticState } from "./DynamicStaticState";
import { ITemplateChildStruct } from "./ITemplateChildStruct";
import { DynamicStatic } from "./DynamicStatic";

export interface ITemplateStruct {
  tag: string;
  className?: DynamicStaticState<string>;
  classList?: DynamicStaticState<string[]>;
  id?: DynamicStaticState<string>;
  style?:
    | Record<string, DynamicStaticState<string>>
    | (() => Record<string, string>)
    | State<Record<string, string>>;
  attributes?:
    | Record<string, DynamicStaticState<string>>
    | (() => Record<string, string>)
    | State<Record<string, string>>;
  childs?: DynamicStatic<ITemplateChildStruct[]>;
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref<HTMLTemplate>;
  innerHTML?: DynamicStatic<string>;
  show?: DynamicStaticState<boolean>;
  watchStates?: State<any>[];
}
