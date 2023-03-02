import { ITemplateStruct, Template } from "../core";

export function templateFuncRef(result: any, a: any): any {
  if (Array.isArray(result)) return null;
  const struct = a as ITemplateStruct;
  if (struct.ref) {
    if (typeof struct.ref == "object") {
      if (struct.ref._name == "Ref") {
        struct.ref._template = result.data as Template;
      }
    } else {
      struct.ref(result.data as Template);
    }
  }
}
