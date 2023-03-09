import { Template } from "../Template";
import { IChildStruct } from "../types/IChildStruct";
import { addChildHTML } from "./htmlChild";
import { addChildString } from "./stringChild";
import { addChildTemplateStruct } from "./structChild";
import { addChildTemplate } from "./templateChild";

export function addChild(_template: Template, child: IChildStruct) {
  let res: any = null;
  res = addChildHTML(_template, res, child);
  res = addChildString(_template, res, child);
  res = addChildTemplate(_template, res, child);
  res = addChildTemplateStruct(_template, res, child);
}
