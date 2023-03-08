import { Template } from "../Template";

export function addChildString(_template: Template, res: any, child: any) {
  if (res != null) return res;
  if (typeof child != "string") return res;

  return true;
}
