import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarsListComponent } from './components/carsList/cars-list.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  declarations: [ AppComponent, CarsListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
