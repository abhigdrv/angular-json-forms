import { Component, Input } from '@angular/core';
import { FieldStyle, FormFieldConfig } from '../../models/form-field.model';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormGeneratorService } from '../../services/form-generator.service';

@Component({
  selector: 'app-form-field',
  template: `
    <div [formGroup]="form">
      <ng-container *ngIf="isFieldVisible(field)">
      <label [for]="field.name" [ngStyle]="getLabelStyle()" [ngClass]="getLabelClass()">{{ field.label }}</label>
      <ng-container [ngSwitch]="field.type">
        <!-- Text inputs -->
        <input *ngSwitchCase="'text'" [formControlName]="field.name" 
              [id]="field.name" type="text"
              [ngClass]="getFieldClass()"
              [ngStyle]="getFieldStyle()" 
              [placeholder]="field.placeholder || ''"               
              [readonly]="field.readonly || false" 
              [min]="field.min || null" 
              [max]="field.max || null" 
              [step]="field.step" 
              [autocomplete]="field.autocomplete"
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'number'" [formControlName]="field.name" 
              [id]="field.name" type="number"
              [ngClass]="getFieldClass()"
              [ngStyle]="getFieldStyle()"               
              [readonly]="field.readonly || false" 
              [min]="field.min || null" 
              [max]="field.max || null" 
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'email'" [formControlName]="field.name" 
              [id]="field.name" type="email"
              [ngClass]="getFieldClass()"
              [ngStyle]="getFieldStyle()" 
              [placeholder]="field.placeholder || ''"              
              [readonly]="field.readonly || false" 
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'password'" [formControlName]="field.name" 
              [id]="field.name" type="password"
              [ngClass]="getFieldClass()"
              [ngStyle]="getFieldStyle()"               
              [readonly]="field.readonly || false" 
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'search'" [formControlName]="field.name" 
              [id]="field.name" type="search"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'tel'" [formControlName]="field.name" 
              [id]="field.name" type="tel"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'url'" [formControlName]="field.name" 
              [id]="field.name" type="url"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">

        <!-- Date and time inputs -->
        <input *ngSwitchCase="'date'" [formControlName]="field.name" 
              [id]="field.name" type="date"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'time'" [formControlName]="field.name" 
              [id]="field.name" type="time"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'datetime-local'" [formControlName]="field.name" 
              [id]="field.name" type="datetime-local"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'month'" [formControlName]="field.name" 
              [id]="field.name" type="month"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'week'" [formControlName]="field.name" 
              [id]="field.name" type="week"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
              
        <!-- Range and color inputs -->
        <input *ngSwitchCase="'range'" [formControlName]="field.name" 
              [id]="field.name" type="range"
              [min]="field.min || null" [max]="field.max || null" [step]="field.step"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
        <input *ngSwitchCase="'color'" [formControlName]="field.name" 
              [id]="field.name" type="color"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">

        <!-- File input -->
        <input *ngSwitchCase="'file'" [formControlName]="field.name" 
              [id]="field.name" type="file"
              [accept]="field.accept" [multiple]="field.multiple"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"
              [disabled]="field.disabled || false"
              [accept]="field.accept" 
              [multiple]="field.multiple"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">

        <!-- Select dropdown -->
        <select *ngSwitchCase="'select'" [formControlName]="field.name" 
              [id]="field.name"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
          <option *ngFor="let option of field.options" [value]="option.key">{{ option.value }}</option>
        </select>

        <!-- Multiple select -->
        <select *ngSwitchCase="'multiselect'" [formControlName]="field.name" 
              [id]="field.name" multiple
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
          <option *ngFor="let option of field.options" [value]="option.key">{{ option.value }}</option>
        </select>

        <!-- Radio buttons -->
        <ng-container *ngSwitchCase="'radio'">
          <div *ngFor="let option of field.options">
            <input type="radio" [formControlName]="field.name" [value]="option.key" 
              [id]="option.key"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
            <label [for]="option.key">{{ option.value }}</label>
          </div>
        </ng-container>

        <!-- Checkbox -->
        <ng-container *ngSwitchCase="'checkbox'">
          <input type="checkbox" [formControlName]="field.name" 
              [id]="field.name"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
          <label [for]="field.name">{{ field.label }}</label>
        </ng-container>

        <!-- Multiple checkboxes -->
        <ng-container *ngSwitchCase="'checkboxgroup'">
          <div *ngFor="let option of field.options">
            <input type="checkbox" [formControlName]="option.key" [id]="option.key"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false"  
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)">
            <label [for]="option.key">{{ option.value }}</label>
          </div>
        </ng-container>

        <!-- Textarea -->
        <textarea *ngSwitchCase="'textarea'" [formControlName]="field.name" 
              [id]="field.name"
              [rows]="field.rows" [cols]="field.cols"
              [ngClass]="getFieldClass()" 
              [ngStyle]="getFieldStyle()"              
              [readonly]="field.readonly || false" 
              [rows]="field.rows"
              [cols]="field.cols" 
              (click)="handleEvent(field, 'click', $event)"
              (change)="handleEvent(field, 'change', $event)"
              (mouseenter)="handleEvent(field, 'hover.mouseenter', $event)"
              (mouseleave)="handleEvent(field, 'hover.mouseleave', $event)"
              (focusin)="handleEvent(field, 'focus.focusin', $event)"
              (focusout)="handleEvent(field, 'focus.focusout', $event)"></textarea>

        <!-- Hidden input -->
        <input *ngSwitchCase="'hidden'" [formControlName]="field.name" 
              [id]="field.name" type="hidden">

        <!-- Default case -->
        <p *ngSwitchDefault>Unsupported field type: {{ field.type }}</p>

        <ng-container *ngSwitchCase="'formGroup'">
          <ng-container *ngIf="isFormGroup(field.name)">
            <app-dynamic-form 
              [formGroup]="getAsFormGroup(field.name)" 
              [fields]="field.formGroup!.fields"
              [isRootForm]="false"
              [globalClass]="globalClass"
              [globalStyle]="globalStyle"
              [globalErrorClass]="globalErrorClass"
              [globalErrorStyle]="globalErrorStyle">
            </app-dynamic-form>
          </ng-container>
        </ng-container>
        
        <ng-container *ngSwitchCase="'formArray'">
          <ng-container *ngIf="isFormArray(field.name)">
            <div [formArrayName]="field.name">
              <div *ngFor="let control of getFormArray(field.name).controls; let i = index">
                <ng-container *ngIf="isFormGroup(control)">
                  <app-dynamic-form 
                    [formGroup]="getAsFormGroup(control)" 
                    [fields]="field.formArray!.fields"
                    [isRootForm]="false"
                    [globalClass]="globalClass"
                    [globalStyle]="globalStyle"
                    [globalErrorClass]="globalErrorClass"
                    [globalErrorStyle]="globalErrorStyle">
                  </app-dynamic-form>
                </ng-container>
                <button type="button" (click)="removeFormArrayField(field.name, i)">Remove</button>
              </div>
            </div>
            <button type="button" (click)="addFormArrayField(field.name, field.formArray!.fields)">Add</button>
          </ng-container>
        </ng-container>
      </ng-container>
      
      <div *ngIf="form.get(field.name)?.invalid && (form.get(field.name)?.dirty || form.get(field.name)?.touched)" [ngClass]="globalErrorClass" [ngStyle]="globalErrorStyle">
        <small *ngIf="form.get(field.name)?.errors?.['required']">This field is required</small>
        <small *ngIf="form.get(field.name)?.errors?.['email']">Please enter a valid email</small>
        <small *ngIf="form.get(field.name)?.errors?.['minlength']">Input is too short</small>
        <small *ngIf="form.get(field.name)?.errors?.['maxlength']">Input is too long</small>
        <small *ngIf="form.get(field.name)?.errors?.['pattern']">Input does not match the required pattern</small>
        <small *ngIf="form.get(field.name)?.errors?.['min']">Input is below the minimum value</small>
        <small *ngIf="form.get(field.name)?.errors?.['max']">Input exceeds the maximum value</small>
        <small *ngIf="form.get(field.name)?.errors?.['whitespace']">Input cannot be only whitespace</small>
        <small *ngIf="form.get(field.name)?.errors?.['passwordMismatch']">Passwords do not match</small>
        <small *ngIf="form.get(field.name)?.errors?.['invalidDate']">Please enter a valid date</small>
        <small *ngIf="form.get(field.name)?.errors?.['invalidUrl']">Please enter a valid URL</small>
        <small *ngIf="form.get(field.name)?.errors?.['invalidCreditCard']">Please enter a valid credit card number</small>
        <small *ngIf="form.get(field.name)?.errors?.['invalidPhoneNumber']">Please enter a valid phone number</small>
        <small *ngIf="form.get(field.name)?.errors?.['uniqueUsername']">This username is already taken</small>
        <small *ngIf="form.get(field.name)?.errors?.['customError']">{{ form.get(field.name)?.errors?.['customError'] }}</small>
      </div>
      </ng-container>
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
  `]
})
export class FormFieldComponent {
  @Input() field!: FormFieldConfig;
  @Input() form!: FormGroup;
  @Input() globalClass?: string;
  @Input() globalStyle?: FieldStyle;
  @Input() globalErrorClass?: string;
  @Input() globalErrorStyle?: FieldStyle;
  @Input() globalLabelClass?: string;
  @Input() globalLabelStyle?: FieldStyle;

  getFieldClass(): string {
    return `${this.globalClass || ''} ${this.field.class || ''}`.trim();
  }

  getFieldStyle(): FieldStyle {
    return { ...this.globalStyle, ...this.field.style };
  }

  getLabelStyle(): FieldStyle {
    return { ...this.globalLabelStyle, ...this.field.labelStyle };
  }

  getLabelClass(): string {
    return `${this.globalLabelClass || ''} ${this.field.labelClass || ''}`.trim();
  }

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

  handleEvent(field: FormFieldConfig, eventType: string, event: Event) {
    const eventHandler = this.getEventHandler(field, eventType);
    if (eventHandler) {
      eventHandler(event);
    }
  }
  
  getEventHandler(field: FormFieldConfig, eventType: string) {
    const [category, subType] = eventType.split('.');
    const fieldHandler = field.events && field.events[category];
  
    if (subType) {
      return (fieldHandler && fieldHandler[subType]);
    }
    return fieldHandler;
  }

  isFieldVisible(field: FormFieldConfig): boolean {
    if (typeof field.visibleWhen === 'function') {
      return field.visibleWhen(this.form.value);  // Evaluate the function
    }
    return true;  // Default to visible if no condition is provided
  }
}
