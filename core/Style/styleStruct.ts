import { State } from "../State";

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
  [K in string]?:
    | string
    | State<any>
    | [State<any>, (value: any) => string]
    | Record<string, StyleStruct>
    | undefined;
} & {
  _?: Record<string, StyleStruct>;
};

type structData = {
  states: State<any>[];
  createArray: (string | (() => string))[];
};

function styleStruct(
  struct: StyleStruct,
  { states, createArray }: structData,
  context = ""
) {
  let subContext: null | Record<string, StyleStruct> = null;
  let text = context + " {\n";
  const aux: (string | (() => string))[] = [];

  Object.keys(struct).forEach((key) => {
    if (struct[key] == undefined) return;

    if (key == "_") {
      subContext = struct["_"] as Record<string, StyleStruct>;
      return;
    }

    let value = struct[key];

    const nKey = processStyleKey(key);
    if (value instanceof State) {
      const _value: State<any> = value;
      aux.push(text);
      states.push(value);
      aux.push(() => `${nKey}:${_value.get()};`);
      text = "";
      return;
    } else if (Array.isArray(value)) {
      const _value: [State<any>, (value: any) => string] = value;
      aux.push(text);
      states.push(_value[0]);
      aux.push(() => `${nKey}:${_value[1](_value[0].get())};`);
      text = "";
      return;
    }

    text += `${nKey}:${value};\n`;
  });

  text += "\n}\n";

  aux.push(text);
  createArray.push(...aux);

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
          { states, createArray: createArray },
          context + " " + aux
        );
    });
  }

  return text;
}

const data: structData = {
  states: [],
  createArray: [],
};
styleStruct(
  {
    width: [new State(12), (value) => `${value}px`],
    _: {
      $_div: {
        width: "100px",
      },
    },
  },
  data,
  ".class"
);
const res = data.createArray.reduce(
  (acc, curr) => acc + (typeof curr == "function" ? curr() : curr),
  ""
);
console.log(res);
