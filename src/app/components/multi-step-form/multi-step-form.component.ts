import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormGeneratorService } from '../../services/form-generator.service';
import { FieldStyle, FormFieldConfig } from '../../models/form-field.model';

@Component({
  selector: 'app-multi-step-form',
  template: `
    <form [formGroup]="form">
      <app-form-field *ngFor="let step of fields; index as i" [field]="step" [form]="form" [ngStyle]="{'display': (i == currentStepIndex) ? 'block' : 'none' }"></app-form-field>
      <div>
        <button type="button" (click)="prevStep()" [disabled]="isFirstStep()">Previous</button>
        <button type="button" (click)="nextStep()" [disabled]="isLastStep()">Next</button>
      </div>
      <div>
        <button type="submit" (click)="onSubmit()" [disabled]="!form.valid">Submit</button>
      </div>
    </form>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 500px;
      margin: 0 auto;
    }
    button[type="submit"] {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button[type="submit"]:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class MultiStepFormComponent {

  @Input() fields: FormFieldConfig[] = [];
  @Input() formGroup?: FormGroup;
  @Input() isRootForm: boolean = true;
  @Input() globalClass?: string;
  @Input() globalStyle?: FieldStyle;
  @Input() globalErrorClass?: string;
  @Input() globalErrorStyle?: FieldStyle;

  @Output() formSubmit = new EventEmitter<any>();

  form!: FormGroup;

  constructor(private formGenerator: FormGeneratorService) {}

  ngOnInit() {
    this.form = this.formGroup || this.formGenerator.createFormGroup(this.fields);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
  currentStepIndex = 0;

  get currentStepFields() {
    return this.fields?.[this.currentStepIndex]?.formGroup?.fields ?? [];
  }

  isFirstStep(): boolean {
    return this.currentStepIndex === 0;
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.fields.length - 1;
  }

  nextStep(): void {
    if (!this.isLastStep()) {
      this.currentStepIndex++;
    }
  }

  prevStep(): void {
    if (!this.isFirstStep()) {
      this.currentStepIndex--;
    }
  }
}
