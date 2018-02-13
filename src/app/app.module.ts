import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent }  from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login.component';

/* Feature Modules */
import { WelcomeModule } from './welcome/welcome.module';
import { SchoolModule } from './info/schools/school.module';
import { UserModule } from './user/users/user.module';
import { BUserModule } from './user/busers/buser.module';

import { SharedService } from './shared.service';

@NgModule({
  imports: [
    WelcomeModule,
    BrowserModule,
	  HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ], { enableTracing: true }),
    SchoolModule,
    UserModule,
    BUserModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SharedService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
