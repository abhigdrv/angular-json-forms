import { ValidatorFn } from '@angular/forms';

export interface ValidationConfig {
  name: string;
  validator: any;
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
}

export interface FormConfig {
  fields: FormFieldConfig[];
}