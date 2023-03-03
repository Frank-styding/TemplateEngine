import { State } from "../core";
import { render } from "../core/Render";
import { templateFunc } from "../templateFunc/templateFunc";
export class Css {
  static data: State<string> = new State<string>("");
  static styles: Record<string, string> = {};
  static initilize() {
    render(
      templateFunc("$head", [
        {
          tag: "style",
          innerHTML: () => this.data.value,
          watchStates: [this.data],
        },
      ])
    );
  }

  constructor(id: string, data: string) {
    if (Css.styles[id] != undefined) return;
    Css.styles[id] = data;
    Css.data.set(Css.data.value + "\n" + data);
  }
}
