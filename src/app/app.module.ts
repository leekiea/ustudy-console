import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { WelcomeComponent }  from './schools/welcome.component';

/* Feature Modules */
import { SchoolModule } from './schools/school.module';

@NgModule({
  imports: [
    BrowserModule,
	  HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }/*,
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
