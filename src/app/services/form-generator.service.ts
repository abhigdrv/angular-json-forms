import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormFieldConfig, ValidationConfig } from '../models/form-field.model';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  constructor(private fb: FormBuilder) {}

  createFormGroup(fields: FormFieldConfig[]): FormGroup {
    const group: any = {};
    
    fields.forEach(field => {
      if (field.type === 'formGroup' && field.formGroup) {
        group[field.name] = this.createFormGroup(field.formGroup.fields);
      } else if (field.type === 'formArray' && field.formArray) {
        group[field.name] = this.createFormArray(field);
      } else {
        group[field.name] = [field.value || '', this.bindValidations(field.validations || [])];
      }
    });
    
    return this.fb.group(group);
  }

  createFormArray(config: FormFieldConfig): FormArray {
    if (!config.formArray) {
      throw new Error('FormArray configuration is missing');
    }
    
    const controls = Array.from(
      { length: config.formArray.initialCount || 1 },
      () => this.createFormGroup(config.formArray!.fields)
    );
    
    return this.fb.array(controls);
  }

  private bindValidations(validations: ValidationConfig[]): ValidatorFn[] {
    return validations.map(validation => {
      switch (validation.name) {
        case 'required':
          return Validators.required;
        case 'email':
          return Validators.email;
        case 'minLength':
          return Validators.minLength(validation.validator);
        case 'maxLength':
          return Validators.maxLength(validation.validator);
        case 'pattern':
          return Validators.pattern(validation.validator);
        default:
          if (validation.name in Validators && typeof (Validators as any)[validation.name] === 'function') {
            return (Validators as any)[validation.name](validation.validator);
          }
          console.warn(`Unknown validator: ${validation.name}`);
          return Validators.nullValidator;
      }
    });
  }
}
