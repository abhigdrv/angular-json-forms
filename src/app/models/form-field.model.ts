export interface ValidationConfig {
  name: string;
  validator: any;
}

export interface FieldStyle {
  [key: string]: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'formGroup' | 'formArray';
  value?: any;
  options?: { key: string; value: string }[];
  validations?: ValidationConfig[];
  formGroup?: { fields: FormFieldConfig[] };
  formArray?: {
    fields: FormFieldConfig[];
    initialCount?: number;
  };
  class?: string;
  style?: FieldStyle;
}

export interface FormConfig {
  fields: FormFieldConfig[];
  globalClass?: string;
  globalStyle?: FieldStyle;
  globalErrorClass?: string;
  globalErrorStyle?: FieldStyle;
}