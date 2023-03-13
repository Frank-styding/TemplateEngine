import { Template } from "../../core/Template/Template";
import { Component } from "../../core/Component/Component";
import { generateUUID } from "../../core/utils/genereUUID";
import { Css } from "../../core";
import { StyleStruct } from "../../core/Css/StyleStruct";
export function funcComponent(
  argA: string,
  argB: (arg?: Record<string, any>) => Template
) {
  if (argA.startsWith("[")) {
    const componentMatch = argA.match(/\[(.|)+\]/g);
    if (componentMatch != null) {
      const componentName = componentMatch[0].replace(/\[|\]/g, "");

      const id = "a" + generateUUID();
      return (args?: Record<string, any>) => {
        const css = new Css(id);
        const template = argB({
          args: args,
          style: (struct: StyleStruct) => {
            css.setStyleStruct(struct);
          },
        });
        css.use(template);
        const component = new Component(componentName, template);
        component.setComponentId(id);
        return component;
      };
    }
  }
}
