import { Component } from '../../Component/Component'
import { DynamicTemplate } from '../../DynamicTemplate/DynamicTemplate'
import { Template } from '../Template'
import { TemplateStruct } from './TemplateStruct'

export type TemplateData = Template | DynamicTemplate | TemplateStruct | Component
