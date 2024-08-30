import { Component } from '@angular/core';
import { FormConfig } from './models/form-field.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
        validations: [
          { name: 'required', validator: null }
        ],
        class: 'name-field',
        style: {
          'font-weight': 'bold'
        },
        events: {
          click: (event) => console.log('Name clicked', event),
          hover: {
            mouseenter: (event) => console.log('Mouse entered name field', event),
            mouseleave: (event) => console.log('Mouse left name field', event)
          }
        }
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        validations: [
          { name: 'required', validator: null },
          { name: 'email', validator: null }
        ],
        style: {
          'color': 'blue'
        }
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
                { name: 'required', validator: null },
                { name: 'pattern', validator: '^[0-9]{5}(?:-[0-9]{4})?$' }
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
                { name: 'required', validator: null },
                { name: 'pattern', validator: '^[0-9]{10}$' }
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
