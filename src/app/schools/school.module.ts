import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { WelcomeComponent } from './welcome.component';
import { SchoolListComponent } from './school-list.component';
import { AddSchoolComponent } from './add-school.component';
import { UpdateSchoolComponent } from './update-school.component';
import { ConfigSubjectsComponent } from './config-subjects.component';

import { SchoolService } from './school.service';

@NgModule({
  imports: [
    CommonModule,
	NgxDatatableModule,
    RouterModule.forChild([
    { path: 'welcome', component: WelcomeComponent },
    { path: 'schoolList', component: SchoolListComponent },
	  { path: 'addSchool', component: AddSchoolComponent },
	  { path: 'updateSchool', component: UpdateSchoolComponent },
    { path: 'subject', component: ConfigSubjectsComponent }
    ]),
	ReactiveFormsModule,
	FormsModule,
	HttpModule
  ],
  declarations: [
    WelcomeComponent,
    SchoolListComponent,
	AddSchoolComponent,
	UpdateSchoolComponent,
  ConfigSubjectsComponent
  ],
  providers: [
    SchoolService
  ]
})
export class SchoolModule {}
