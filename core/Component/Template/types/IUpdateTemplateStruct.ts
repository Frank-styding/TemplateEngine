import { State } from "../../State";
import { IEventsData } from "./IEventsData";
import { ITemplateChildStruct } from "./ITemplateChildStruct";

export interface IUpdateTemplateStruct {
  className?: string;
  classList?: string[];
  id?: string;
  style?: Record<string, string>;
  attributes?: Record<string, string>;
  events?: IEventsData;
  childs?: ITemplateChildStruct[];
  innerHTML?: string;
  show?: boolean;
  watchStates?: State<any>[];
}
