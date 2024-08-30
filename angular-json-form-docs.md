# Angular JSON Form Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Components](#components)
5. [Models](#models)
6. [Services](#services)
7. [Styling](#styling)
8. [Event Handling](#event-handling)
9. [Validation](#validation)
10. [Advanced Usage](#advanced-usage)
11. [API Reference](#api-reference)

## 1. Introduction

Angular JSON Form is a powerful and flexible library for generating dynamic forms in Angular applications. It allows you to create complex forms with nested structures, custom styling, and advanced validation using a simple JSON configuration.

## 2. Installation

To install the Angular JSON Form library, run the following command in your Angular project:

```bash
npm install angular-json-form
```

## 3. Usage

To use the Angular JSON Form in your application, follow these steps:

1. Import the `DynamicFormModule` in your `app.module.ts`:

```typescript
import { DynamicFormModule } from 'angular-json-form';

@NgModule({
  imports: [
    // ...
    DynamicFormModule
  ],
  // ...
})
export class AppModule { }
```

2. Create a form configuration in your component:

```typescript
import { Component } from '@angular/core';
import { FormConfig } from 'angular-json-form';

@Component({
  selector: 'app-root',
  template: `
    <app-dynamic-form 
      [fields]="formConfig.fields"
      [globalClass]="formConfig.globalClass"
      [globalStyle]="formConfig.globalStyle"
      [globalErrorClass]="formConfig.globalErrorClass"
      [globalErrorStyle]="formConfig.globalErrorStyle"
      (formSubmit)="onFormSubmit($event)">
    </app-dynamic-form>
  `
})
export class AppComponent {
  formConfig: FormConfig = {
    // Your form configuration here
  };

  onFormSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    // Handle form submission
  }
}
```

## 4. Components

### DynamicFormComponent

The main component that renders the entire form based on the provided configuration.

**Inputs:**
- `fields: FormFieldConfig[]`: An array of field configurations
- `formGroup?: FormGroup`: An optional FormGroup to bind the form to
- `isRootForm: boolean`: Indicates if this is the root form or a nested form
- `globalClass?: string`: Global CSS class for all form fields
- `globalStyle?: FieldStyle`: Global styles for all form fields
- `globalErrorClass?: string`: Global CSS class for error messages
- `globalErrorStyle?: FieldStyle`: Global styles for error messages

**Outputs:**
- `formSubmit: EventEmitter<any>`: Emits the form value when submitted

### FormFieldComponent

Renders individual form fields based on their configuration.

**Inputs:**
- `field: FormFieldConfig`: Configuration for the field
- `form: FormGroup`: The FormGroup that the field belongs to
- `globalClass?: string`: Global CSS class for the field
- `globalStyle?: FieldStyle`: Global styles for the field
- `globalErrorClass?: string`: Global CSS class for error messages
- `globalErrorStyle?: FieldStyle`: Global styles for error messages

## 5. Models

### FormFieldConfig

Defines the configuration for a single form field.

```typescript
interface FormFieldConfig {
  name: string;
  label: string;
  type: InputType;
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
}
```

### FormConfig

Defines the configuration for the entire form.

```typescript
interface FormConfig {
  fields: FormFieldConfig[];
  globalClass?: string;
  globalStyle?: FieldStyle;
  globalErrorClass?: string;
  globalErrorStyle?: FieldStyle;
  submitButtonText?: string;
  cancelButtonText?: string;
}
```

## 6. Services

### FormGeneratorService

A service that generates Angular reactive forms based on the provided configuration.

**Methods:**
- `createFormGroup(fields: FormFieldConfig[]): FormGroup`: Creates a FormGroup based on the field configurations
- `createFormArray(config: FormFieldConfig): FormArray`: Creates a FormArray based on the field configuration

## 7. Styling

You can apply styles to your form fields in several ways:

1. Global styles for all fields using `globalClass` and `globalStyle`
2. Global styles for error messages using `globalErrorClass` and `globalErrorStyle`
3. Field-specific styles using `class` and `style` properties in the field configuration

Example:

```typescript
formConfig: FormConfig = {
  globalClass: 'form-control',
  globalStyle: {
    'font-family': 'Arial, sans-serif',
    'font-size': '14px',
    'padding': '5px'
  },
  globalErrorClass: 'error',
  globalErrorStyle: {
    'color': 'red',
    'font-size': '9px',
    'padding': '5px'
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      class: 'name-field',
      style: {
        'font-weight': 'bold'
      }
    },
    // ...
  ]
};
```

## 8. Event Handling

You can attach event handlers to form fields using the `events` property in the field configuration:

```typescript
{
  name: 'name',
  label: 'Name',
  type: 'text',
  events: {
    click: (event) => console.log('Name clicked', event),
    hover: {
      mouseenter: (event) => console.log('Mouse entered name field', event),
      mouseleave: (event) => console.log('Mouse left name field', event)
    },
    focus: {
      focusin: (event) => console.log('Name field focused', event),
      focusout: (event) => console.log('Name field blurred', event)
    }
  }
}
```

## 9. Validation

The library supports various built-in validators and custom validators:

```typescript
{
  name: 'email',
  label: 'Email',
  type: 'email',
  validations: [
    { name: 'required', validator: null },
    { name: 'email', validator: null },
    { name: 'minLength', validator: 5 },
    { name: 'maxLength', validator: 50 },
    { name: 'pattern', validator: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' }
  ]
}
```

Custom validators can be added by extending the `FormGeneratorService`.

## 10. Advanced Usage

### Nested Forms

You can create nested forms using `formGroup` and `formArray`:

```typescript
{
  name: 'address',
  label: 'Address',
  type: 'formGroup',
  formGroup: {
    fields: [
      {
        name: 'street',
        label: 'Street',
        type: 'text'
      },
      {
        name: 'city',
        label: 'City',
        type: 'text'
      }
    ]
  }
}
```

### Dynamic Form Arrays

Create dynamic form arrays that allow adding and removing fields:

```typescript
{
  name: 'phoneNumbers',
  label: 'Phone Numbers',
  type: 'formArray',
  formArray: {
    initialCount: 1,
    fields: [
      {
        name: 'phoneNumber',
        label: 'Phone Number',
        type: 'text'
      }
    ]
  }
}
```

## 11. API Reference

For a complete API reference, including all available field types, validators, and configuration options, please refer to the source code and interfaces provided in the `form-field.model.ts` file.

