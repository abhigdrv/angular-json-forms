export interface ValidationConfig {
  name: string;
  validator: any;
  message?: string;
}

export interface FieldStyle {
  [key: string]: string;
}

export type InputType = 
  'text' | 'number' | 'email' | 'password' | 'search' | 'tel' | 'url' |
  'date' | 'time' | 'datetime-local' | 'month' | 'week' |
  'range' | 'color' | 'file' |
  'select' | 'multiselect' | 'radio' | 'checkbox' | 'checkboxgroup' |
  'textarea' | 'hidden' | 'formGroup' | 'formArray';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: InputType;
  value?: any;
  options?: { key: string; value: string }[];
  apiUrl?: string;
  validations?: ValidationConfig[];
  formGroup?: { fields: FormFieldConfig[] };
  formArray?: {
    fields: FormFieldConfig[];
    initialCount?: number;
  };
  class?: string;
  style?: FieldStyle;
  labelClass?: string;
  labelStyle?: FieldStyle;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number;
  accept?: string;
  multiple?: boolean;
  rows?: number;
  cols?: number;
  autocomplete?: string;
  required?: boolean;
  events?: FieldEvent;
  visibleWhen?: (formValue: any) => boolean;
}

export interface FieldEvent {
  click?: (event: MouseEvent) => void;
  hover?: {
    mouseenter?: (event: MouseEvent) => void;
    mouseleave?: (event: MouseEvent) => void;
  };
  focus?: {
    focusin?: (event: FocusEvent) => void;
    focusout?: (event: FocusEvent) => void;
  };
  [key: string]: any;
}

export interface FormConfig {
  fields: FormFieldConfig[];
  globalClass?: string;
  globalStyle?: FieldStyle;
  globalErrorClass?: string;
  globalErrorStyle?: FieldStyle;
  globalLabelClass?: string;
  globalLabelStyle?: FieldStyle;
  submitButtonText?: string;
  cancelButtonText?: string;
}