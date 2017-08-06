import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { BUserListComponent } from './buser-list.component';
import { AddBUserComponent } from './add-buser.component';
import { UpdateBUserComponent } from './update-buser.component';

import { BUserService } from './buser.service';

@NgModule({
  imports: [
    CommonModule,
	NgxDatatableModule,
    RouterModule.forChild([
    { path: 'bUserList', component: BUserListComponent },
	  { path: 'addBUser', component: AddBUserComponent },
	  { path: 'updateBUser', component: UpdateBUserComponent }
    ]),
	ReactiveFormsModule,
	FormsModule,
	HttpModule
  ],
  declarations: [
    BUserListComponent,
	AddBUserComponent,
	UpdateBUserComponent
  ],
  providers: [
    BUserService
  ]
})
export class BUserModule {}
