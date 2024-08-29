import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormGeneratorService } from '../../services/form-generator.service';
import { FormFieldConfig } from '../../models/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <ng-container *ngFor="let field of fields">
        <app-form-field [field]="field" [form]="form"></app-form-field>
      </ng-container>
      <button *ngIf="isRootForm" type="submit" [disabled]="!form.valid">Submit</button>
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
export class DynamicFormComponent {
  @Input() fields: FormFieldConfig[] = [];
  @Input() formGroup?: FormGroup;
  @Input() isRootForm: boolean = true;

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
}
