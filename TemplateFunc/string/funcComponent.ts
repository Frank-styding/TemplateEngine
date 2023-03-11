import { Template } from "../../core/Template/Template";
import { Component } from "../../core/Component/Component";
import { generateUUID } from "../../core/utils/genereUUID";
import { TemplateFunction } from "../TemplateFunc";
import { State } from "../../core";

class Style {
  static styleTemplate: Template = TemplateFunction("style", {
    innerHTML: () => {
      let text = "";
      Object.values(Style.styleData).forEach((item) => {
        if (typeof item === "function") {
          text += item();
          return;
        }
        text += item;
      });
      return text;
    },
  });
  static styleData: Record<string, string | (() => string)> = {};

  static initalize() {
    TemplateFunction("head", [Style.styleTemplate]);
  }

  constructor(public uuid: string) {}

  set(text: string | [() => string, State<any>[]]) {
    if (Array.isArray(text)) {
      Style.styleData[this.uuid] = text[0];
      Style.styleTemplate.initWatchStates(text[1]);
    }
  }
}

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
