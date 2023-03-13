import { Component } from "../../Component/Component";
import { Template } from "../Template";
import { IDynamicStruct } from "./IDynamicStruct";

export type IChildStruct =
  | IDynamicStruct
  | Component
  | Template
  | HTMLElement
  | string;
