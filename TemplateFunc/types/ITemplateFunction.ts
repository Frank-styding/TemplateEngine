import { Component } from "../../core/Component/Component";
import { Template } from "../../core/Template/Template";
import { ISelectorList } from "./IArgAString";
export type TFunc<T> = T extends ISelectorList
  ? Template[]
  : T extends `[${string}]`
  ? (args?: Record<string, any>) => Component
  : Template;
