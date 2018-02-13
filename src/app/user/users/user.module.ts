import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import { UserListComponent } from './user-list.component';
import { AddUserComponent } from './add-user.component';
import { UpdateUserComponent } from './update-user.component';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
	NgxDatatableModule,
    RouterModule.forChild([
    { path: 'userList', component: UserListComponent },
	  { path: 'addUser', component: AddUserComponent },
	  { path: 'updateUser', component: UpdateUserComponent }
    ]),
	ReactiveFormsModule,
	FormsModule,
	HttpModule
  ],
  declarations: [
    UserListComponent,
	AddUserComponent,
	UpdateUserComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule {}
