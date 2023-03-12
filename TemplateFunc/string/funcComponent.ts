import { Template } from "../../core/Template/Template";
import { Component } from "../../core/Component/Component";
import { generateUUID } from "../../core/utils/genereUUID";

export function funcComponent(
  argA: string,
  argB: (arg?: Record<string, any>) => Template
) {
  if (argA.startsWith("[")) {
    const componentMatch = argA.match(/\[(.|)+\]/g);
    if (componentMatch != null) {
      const componentName = componentMatch[0].replace(/\[|\]/g, "");

      const uuid = generateUUID();
      return (args: Record<string, any>) => {
        const template = argB({ args: args });
        const component = new Component(componentName, template);
        component.setUUID(uuid);
        return component;
      };
    }
  }
}
