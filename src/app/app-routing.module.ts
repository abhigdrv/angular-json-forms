import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './components/example/example.component';
import { DocComponent } from './components/doc/doc.component';

const routes: Routes = [
  {
    path: '',
    component:ExampleComponent
  },
  {
    path: 'docs',
    component:DocComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
