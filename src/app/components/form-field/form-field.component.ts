import { Component, Input } from '@angular/core';
import { FormFieldConfig } from '../../models/form-field.model';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-form-field',
  template: `
    <div [formGroup]="form">
      <label [for]="field.name">{{ field.label }}</label>
      
      <ng-container [ngSwitch]="field.type">
        <input *ngSwitchCase="'text'" [formControlName]="field.name" [id]="field.name" type="text">
        <input *ngSwitchCase="'number'" [formControlName]="field.name" [id]="field.name" type="number">
        <input *ngSwitchCase="'email'" [formControlName]="field.name" [id]="field.name" type="email">
        <input *ngSwitchCase="'password'" [formControlName]="field.name" [id]="field.name" type="password">
        
        <select *ngSwitchCase="'select'" [formControlName]="field.name" [id]="field.name">
          <option *ngFor="let option of field.options" [value]="option.key">{{ option.value }}</option>
        </select>
        
        <ng-container *ngSwitchCase="'radio'">
          <div *ngFor="let option of field.options">
            <input type="radio" [formControlName]="field.name" [value]="option.key" [id]="option.key">
            <label [for]="option.key">{{ option.value }}</label>
          </div>
        </ng-container>
        
        <ng-container *ngSwitchCase="'checkbox'">
          <input type="checkbox" [formControlName]="field.name" [id]="field.name">
        </ng-container>
        
        <textarea *ngSwitchCase="'textarea'" [formControlName]="field.name" [id]="field.name"></textarea>
        
        <ng-container *ngSwitchCase="'formGroup'">
          <ng-container *ngIf="isFormGroup(field.name)">
            <app-dynamic-form [formGroup]="getAsFormGroup(field.name)" [fields]="field.formGroup!.fields" [isRootForm]="false"></app-dynamic-form>
          </ng-container>
        </ng-container>
        
        <ng-container *ngSwitchCase="'formArray'">
          <ng-container *ngIf="isFormArray(field.name)">
            <div [formArrayName]="field.name">
              <div *ngFor="let control of getFormArray(field.name).controls; let i = index">
                <ng-container *ngIf="isFormGroup(control)">
                  <app-dynamic-form [formGroup]="getAsFormGroup(control)" [fields]="field.formArray!.fields" [isRootForm]="false"></app-dynamic-form>
                </ng-container>
                <button type="button" (click)="removeFormArrayField(field.name, i)">Remove</button>
              </div>
            </div>
            <button type="button" (click)="addFormArrayField(field.name, field.formArray!.fields)">Add</button>
          </ng-container>
        </ng-container>
      </ng-container>
      
      <div *ngIf="form.get(field.name)?.invalid && (form.get(field.name)?.dirty || form.get(field.name)?.touched)">
        <small *ngIf="form.get(field.name)?.errors?.['required']">This field is required</small>
        <small *ngIf="form.get(field.name)?.errors?.['email']">Please enter a valid email</small>
        <!-- Add more error messages as needed -->
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input, select, textarea {
      width: 100%;
      padding: 0.5rem;
    }
  `]
})
export class FormFieldComponent {
  @Input() field!: FormFieldConfig;
  @Input() form!: FormGroup;

  constructor(private formGenerator: FormGeneratorService) {}

  isFormGroup(control: AbstractControl | string): control is FormGroup {
    const ctrl = typeof control === 'string' ? this.form.get(control) : control;
    return ctrl instanceof FormGroup;
  }

  isFormArray(control: AbstractControl | string): control is FormArray {
    const ctrl = typeof control === 'string' ? this.form.get(control) : control;
    return ctrl instanceof FormArray;
  }

  getAsFormGroup(control: AbstractControl | string): FormGroup {
    const ctrl = typeof control === 'string' ? this.form.get(control) : control;
    if (ctrl instanceof FormGroup) {
      return ctrl;
    }
    throw new Error('Control is not a FormGroup');
  }

  getFormArray(fieldName: string): FormArray {
    const control = this.form.get(fieldName);
    if (control instanceof FormArray) {
      return control;
    }
    throw new Error('Field is not a FormArray');
  }

  addFormArrayField(fieldName: string, fields: FormFieldConfig[]) {
    const formArray = this.getFormArray(fieldName);
    const newGroup = this.formGenerator.createFormGroup(fields);
    formArray.push(newGroup);
  }

  removeFormArrayField(fieldName: string, index: number) {
    const formArray = this.getFormArray(fieldName);
    formArray.removeAt(index);
  }
}
