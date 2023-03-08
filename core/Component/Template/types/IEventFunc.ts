import { Template } from "../Template";
import { IEventMap } from "./IEventMap";

export type IEventFunc<K extends keyof IEventMap> = (
  this: Template,
  env: (HTMLElementEventMap & SVGElementEventMap)[K]
) => void;
