import { State } from "../../State";
import { IDynamicStatic } from "./IDynamicStatic";
import { IDynamicStaticObject } from "./IDynamicStaticObject";
import { IEventsData } from "./IEventsData";
import { ITemplateChildStruct } from "./ITemplateChildStruct";

export interface IDynamicTemplateStruct {
  className?: IDynamicStatic<string>;
  classList?: IDynamicStatic<string[]>;
  id?: IDynamicStatic<string>;
  style?: IDynamicStaticObject<Record<string, string>>;
  attributes?: IDynamicStaticObject<Record<string, string>>;
  events?: IEventsData;
  childs?: IDynamicStatic<ITemplateChildStruct[]>;
  innerHTML?: IDynamicStatic<string>;
  show?: IDynamicStatic<boolean>;
  watchSates?: State<any>[];
}
