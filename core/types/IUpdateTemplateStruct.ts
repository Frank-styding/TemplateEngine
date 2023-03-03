import { HTMLTemplate } from "../Template/HTMLTemplate/HTMLTemplate";
import { Ref } from "../Ref";
import { State } from "../State";
import { Template } from "../Template/Template";
import { DynamicStaticState } from "./DynamicStaticState";
import { ITemplateStruct } from "./ITemplateStruct";
import { DynamicStatic } from "./DynamicStatic";
import { ITemplateChildStruct } from "./ITemplateChildStruct";

export interface IUpdateTemplateStruct {
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

  innerHTML?: (() => string) | string;
  show?: DynamicStaticState<boolean>;
  events?: Record<string, any>;
  ref?: ((element: Template) => void) | Ref<HTMLTemplate>;
  watchStates?: State<any>[];
  //HTMLElement?: HTMLElement;
}
