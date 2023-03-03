import { ITemplateStruct } from "../../../types/ITemplateStruct";
import { Template } from "../../Template";
import { HTMLTemplate } from "../HTMLTemplate";
import { addChildHTML } from "./htmlChild";
import { addChildString } from "./stringChild";
import { addChildTemplateStruct } from "./structChild";
import { addChildTemplate } from "./templateChild";
import { addChildText } from "./textChild";

export function createChild(
  _template: HTMLTemplate,
  child:
    | Template
    | HTMLElement
    | `textNode:${string}`
    | `template:${string}`
    | Text
    | ITemplateStruct
) {
  let res: any = null;
  res = addChildHTML(_template, res, child);
  res = addChildString(_template, res, child);
  res = addChildText(_template, res, child);
  res = addChildTemplate(_template, res, child);
  res = addChildTemplateStruct(_template, res, child);
}
