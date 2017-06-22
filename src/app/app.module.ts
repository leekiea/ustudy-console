import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { SchoolListComponent }  from './schools/school-list.component';

/* Feature Modules */
import { SchoolModule } from './schools/school.module';

@NgModule({
  imports: [
    BrowserModule,
	NgxDatatableModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'school', component: SchoolListComponent },
      { path: '', redirectTo: 'school', pathMatch: 'full' }/*,
      { path: '**', redirectTo: 'school', pathMatch: 'full' }*/
    ]),
	SchoolModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
