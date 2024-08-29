import { Component } from '@angular/core';
import { FormConfig } from './models/form-field.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  formConfig: FormConfig = {
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
        validations: [
          { name: 'required', validator: null }
        ]
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        validations: [
          { name: 'required', validator: null },
          { name: 'email', validator: null }
        ]
      },
      {
        name: 'address',
        label: 'Address',
        type: 'formGroup',
        formGroup: {
          fields: [
            {
              name: 'street',
              label: 'Street',
              type: 'text',
              validations: [
                { name: 'required', validator: null }
              ]
            },
            {
              name: 'city',
              label: 'City',
              type: 'text',
              validations: [
                { name: 'required', validator: null }
              ]
            },
            {
              name: 'zipCode',
              label: 'Zip Code',
              type: 'text',
              validations: [
                { name: 'required', validator: null }
              ]
            }
          ]
        }
      },
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
              type: 'text',
              validations: [
                { name: 'required', validator: null }
              ]
            }
          ]
        }
      }
    ]
  };

  onFormSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    // Handle form submission
  }
}
