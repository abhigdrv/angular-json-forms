import { Component } from '@angular/core';
import { FormConfig } from '../../models/form-field.model';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss'
})
export class ExampleComponent {
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

  selectedFormTitle: string = 'Select a form';
  selectedFormConfig: FormConfig | null = null;

  // Global styles for all forms
  globalFormConfig: Partial<FormConfig> = {
    globalClass: 'form-control',
    globalStyle: {
      'font-family': 'Arial, sans-serif',
      'font-size': '14px',
      'padding': '5px',
    },
    globalErrorClass: 'error-message',
    globalErrorStyle: {
      'color': 'red',
      'font-size': '12px',
      'margin-top': '5px'
    }
  };

  // 1. Basic Form Configuration
  basicFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        validations: [
          { name: 'required', validator: null, message: 'Name is required' }
        ]
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        validations: [
          { name: 'required', validator: null, message: 'Email is required' },
          { name: 'email', validator: null, message: 'Invalid email format' }
        ]
      },
      {
        name: 'age',
        label: 'Age',
        type: 'number',
        validations: [
          { name: 'required', validator: null, message: 'Age is required' },
          { name: 'min', validator: 18, message: 'Must be at least 18 years old' }
        ]
      }
    ]
  };

  // 2. Advanced Form Configuration
  advancedFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        validations: [
          { name: 'required', validator: null, message: 'Username is required' },
          { name: 'minLength', validator: 3, message: 'Username must be at least 3 characters long' }
        ]
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        validations: [
          { name: 'required', validator: null, message: 'Password is required' },
          { name: 'pattern', validator: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number' }
        ]
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        validations: [
          { name: 'required', validator: null, message: 'Please confirm your password' },
          { name: 'passwordMismatch', validator: null, message: 'Passwords do not match' }
        ]
      },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { key: 'user', value: 'User' },
          { key: 'admin', value: 'Administrator' },
          { key: 'guest', value: 'Guest' }
        ],
        apiUrl:"https://mocki.io/v1/9ab9b2f4-3443-4b7b-8e96-a3715458da6d",
        validations: [
          { name: 'required', validator: null, message: 'Please select a role' }
        ]
      }
    ]
  };

  // 3. Nested Form Configuration
  nestedFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'personalInfo',
        label: 'Personal Information',
        type: 'formGroup',
        formGroup: {
          fields: [
            {
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              validations: [
                { name: 'required', validator: null, message: 'First name is required' }
              ]
            },
            {
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              validations: [
                { name: 'required', validator: null, message: 'Last name is required' }
              ]
            }
          ]
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
                { name: 'required', validator: null, message: 'Street is required' }
              ]
            },
            {
              name: 'city',
              label: 'City',
              type: 'text',
              validations: [
                { name: 'required', validator: null, message: 'City is required' }
              ]
            },
            {
              name: 'zipCode',
              label: 'Zip Code',
              type: 'text',
              validations: [
                { name: 'required', validator: null, message: 'Zip code is required' },
                { name: 'pattern', validator: '^[0-9]{5}(?:-[0-9]{4})?$', message: 'Invalid zip code format' }
              ]
            }
          ]
        }
      }
    ]
  };

  // 4. Form Array Configuration
  arrayFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'contacts',
        label: 'Contacts',
        type: 'formArray',
        formArray: {
          initialCount: 1,
          fields: [
            {
              name: 'name',
              label: 'Contact Name',
              type: 'text',
              validations: [
                { name: 'required', validator: null, message: 'Contact name is required' }
              ]
            },
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'tel',
              validations: [
                { name: 'required', validator: null, message: 'Phone number is required' },
                { name: 'pattern', validator: '^\\+?[1-9]\\d{1,14}$', message: 'Invalid phone number format' }
              ]
            }
          ]
        }
      }
    ]
  };

  // 5. Custom Validation Form Configuration
  validationFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        validations: [
          { name: 'required', validator: null, message: 'Username is required' },
          { name: 'uniqueUsername', validator: null, message: 'This username is already taken' }
        ]
      },
      {
        name: 'creditCard',
        label: 'Credit Card Number',
        type: 'text',
        validations: [
          { name: 'required', validator: null, message: 'Credit card number is required' },
          { name: 'invalidCreditCard', validator: null, message: 'Invalid credit card number' }
        ]
      },
      {
        name: 'expirationDate',
        label: 'Expiration Date (MM/YY)',
        type: 'text',
        validations: [
          { name: 'required', validator: null, message: 'Expiration date is required' },
          { name: 'pattern', validator: '^(0[1-9]|1[0-2])\/?([0-9]{2})$', message: 'Invalid expiration date format' },
          { name: 'invalidDate', validator: null, message: 'Expiration date must be in the future' }
        ]
      }
    ]
  };

  //6. Multi step 
  multiStepFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'step1',
        label: 'Step 1',
        type: 'formGroup',
        formGroup: {
          fields: [
            {
              name: 'email',
              label: 'Email',
              type: 'email',
              validations: [
                { name: 'required', validator: null, message: 'Email is required' },
                { name: 'email', validator: null, message: 'Invalid email format' }
              ]
            }
          ]
        }
      },
      {
        name: 'step2',
        label: 'Step 2',
        type: 'formGroup',
        formGroup: {
          fields: [
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'tel',
              validations: [
                { name: 'required', validator: null, message: 'Phone number is required' }
              ]
            }
          ]
        }
      }
    ]
  };
  
  // 7. Conditional Fields Form Configuration
  conditionalFormConfig: FormConfig = {
    ...this.globalFormConfig,
    fields: [
      {
        name: 'employmentStatus',
        label: 'Employment Status',
        type: 'select',
        options: [
          { key: 'employed', value: 'Employed' },
          { key: 'selfEmployed', value: 'Self-employed' },
          { key: 'unemployed', value: 'Unemployed' }
        ],
        validations: [
          { name: 'required', validator: null, message: 'Please select your employment status' }
        ]
      },
      {
        name: 'companyName',
        label: 'Company Name',
        type: 'text',
        visibleWhen: (formValue: any) => formValue.employmentStatus === 'employed'
      },
      {
        name: 'businessName',
        label: 'Business Name',
        type: 'text',
        visibleWhen: (formValue: any) => formValue.employmentStatus === 'selfEmployed'
      },
      {
        name: 'lastEmploymentDate',
        label: 'Date of Last Employment',
        type: 'date',
        visibleWhen: (formValue: any) => formValue.employmentStatus === 'unemployed'
      }
    ]
  };

  selectForm(formType: string) {
    switch (formType) {
      case 'basic':
        this.selectedFormTitle = 'Basic Form';
        this.selectedFormConfig = this.basicFormConfig;
        break;
      case 'advanced':
        this.selectedFormTitle = 'Advanced Form';
        this.selectedFormConfig = this.advancedFormConfig;
        break;
      case 'nested':
        this.selectedFormTitle = 'Nested Form';
        this.selectedFormConfig = this.nestedFormConfig;
        break;
      case 'array':
        this.selectedFormTitle = 'Form Array';
        this.selectedFormConfig = this.arrayFormConfig;
        break;
      case 'validation':
        this.selectedFormTitle = 'Custom Validation Form';
        this.selectedFormConfig = this.validationFormConfig;
        break;
      case 'multiStep':
        this.selectedFormTitle = 'Multi Step Form';
        this.selectedFormConfig = this.multiStepFormConfig;
        break;
      case 'conditional':
        this.selectedFormTitle = 'Conditional Form';
        this.selectedFormConfig = this.conditionalFormConfig;
        break;
      default:
        this.selectedFormTitle = 'Select a form';
        this.selectedFormConfig = null;
    }
  }

  onFormSubmit(formValue: any) {
    console.log('Form submitted:', formValue);
    // Handle form submission
  }
}
