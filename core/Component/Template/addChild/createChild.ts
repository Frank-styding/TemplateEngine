import { Template } from "../Template";
import { ITemplateChildStruct } from "../types/ITemplateChildStruct";
import { addChildHTML } from "./htmlChild";
import { addChildString } from "./stringChild";
import { addChildTemplateStruct } from "./structChild";
import { addChildTemplate } from "./templateChild";

export function createChild(_template: Template, child: ITemplateChildStruct) {
  let res: any = null;
  res = addChildHTML(_template, res, child);
  res = addChildString(_template, res, child);
  res = addChildTemplate(_template, res, child);
  res = addChildTemplateStruct(_template, res, child);
}
