import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsListComponent } from './components/carsList/cars-list.component';

const appRoutes: Routes = [
  { path: '',   redirectTo: '/carsList', pathMatch: 'full' },
  { path: 'carsList', component: CarsListComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }