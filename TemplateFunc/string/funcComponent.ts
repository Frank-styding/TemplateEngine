import { Template } from "../../core/Template/Template";
import { Component } from "../../core/Component/Component";
import { generateUUID } from "../../core/utils/genereUUID";
import { State } from "../../core/State";

function processStyleKey(key: string) {
  const match = key.match(/([a-z][A-Z])/g);

  if (match != null) {
    match.forEach((item) => {
      const replaceValue = item[0] + "-" + item[1].toLowerCase();
      key = key.replace(item, replaceValue);
    });
  }

  return key;
}

type StyleStruct = {
  [K in keyof CSSStyleDeclaration]: string | State<string> | undefined;
} & {
  _: Record<string, StyleStruct>;
};

function styleStruct(struct: StyleStruct, context: string = "") {
  const states = [];
  let subContext: null | Record<string, StyleStruct> = null;

  let text = context + "{";
  Object.keys(struct).forEach((key) => {
    if (struct[key] == undefined) return;

    if (key == "_") {
      subContext = struct["_"];
      return;
    }

    let value = struct[key];
    if (value instanceof State) {
      value = value.get();
    }
    const nKey = processStyleKey(key);
    text += `${nKey}:${value};\n`;
  });
  text += "}";

  if (subContext != null) {
    Object.keys(subContext).forEach((key) => {
      const aux = key
        .replace(/\$/g, "> ")
        .replace(/__/g, " #")
        .replace(/_/g, " .");

      text +=
        "\n" +
        styleStruct(
          (subContext as Record<string, StyleStruct>)[key],
          context + " " + aux
        );
    });
  }

  return text;
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
