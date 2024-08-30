import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormFieldConfig, ValidationConfig } from '../models/form-field.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  createFormGroup(fields: FormFieldConfig[]): FormGroup {
    const group: any = {};
    
    fields.forEach(async (field) => {
      if (field.type === 'formGroup' && field.formGroup) {
        group[field.name] = this.createFormGroup(field.formGroup.fields);
      } else if (field.type === 'formArray' && field.formArray) {
        group[field.name] = this.createFormArray(field);
      } else {
        group[field.name] = [field.value || '', this.bindValidations(field.validations || [])];
        if(field.options && field.apiUrl){
          await this.fetchOptionsFromApi(field);
        }
      }
    });
    
    return this.fb.group(group);
  }

  async fetchOptionsFromApi(field: FormFieldConfig) {
    if (field.apiUrl) { 
      this.http.get<{ key: string; value: string }[]>(field.apiUrl).subscribe({
        next: (response: any) => {
          if(response.data) field.options = response.data;
        },
        error: (error: any) => { 
          console.error(`Failed to fetch options for ${field.name}:`, error);
        },
        complete: () => {}
      });
    } else {
      console.error(`API URL is not defined for field: ${field.name}`);
    }
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
        case 'min':
          return Validators.min(validation.validator);
        case 'max':
          return Validators.max(validation.validator);
        case 'whitespace':
          return this.noWhitespaceValidator;
        case 'passwordMismatch':
          return this.passwordMatchValidator;
        case 'invalidDate':
          return this.dateValidator;
        case 'invalidUrl':
          return this.urlValidator;
        case 'invalidCreditCard':
          return this.creditCardValidator;
        case 'invalidPhoneNumber':
          return this.phoneNumberValidator;
        case 'uniqueUsername':
          return this.uniqueUsernameValidator;
        default:
          if (validation.name in Validators && typeof (Validators as any)[validation.name] === 'function') {
            return (Validators as any)[validation.name](validation.validator);
          }
          console.warn(`Unknown validator: ${validation.name}`);
          return Validators.nullValidator;
      }
    });
  }

  private noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { 'whitespace': true } : null;
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { 'passwordMismatch': true } 
      : null;
  }

  private dateValidator(control: AbstractControl): ValidationErrors | null {
    const valid = /^\d{4}-\d{2}-\d{2}$/.test(control.value);
    return valid ? null : { 'invalidDate': true };
  }

  private urlValidator(control: AbstractControl): ValidationErrors | null {
    try {
      new URL(control.value);
      return null;
    } catch {
      return { 'invalidUrl': true };
    }
  }

  private creditCardValidator(control: AbstractControl): ValidationErrors | null {
    // Implement credit card validation logic
    // This is a simple check. For production, use a more robust method
    const valid = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(control.value);
    return valid ? null : { 'invalidCreditCard': true };
  }

  private phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    // Implement phone number validation logic
    // This is a simple check. Adjust according to your needs
    const valid = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(control.value);
    return valid ? null : { 'invalidPhoneNumber': true };
  }

  private uniqueUsernameValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    // This should be an async validator that checks against your backend
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'admin') {
          resolve({ 'uniqueUsername': true });
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
}
