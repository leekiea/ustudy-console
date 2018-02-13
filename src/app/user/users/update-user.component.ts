import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from './user';
import { UserService } from './user.service';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'update-user.component.html'
})

export class UpdateUserComponent implements OnInit {

	public updateForm : FormGroup;
    
	errorMessage: string;

    user: IUser = {
    	'id' : '',
		'userName' : '',
		'userId' : '',
		'password' : '',
		'userType' : '',
		'province' : '',
		'city' : '',
		'district' : ''
	};

	provinces = [];
	
	cities = [];
	
	districts = [];
	
	types = [];

	oldPassword: string = "";

	constructor(private _userService: UserService, public fb: FormBuilder, public route: ActivatedRoute, public router: Router,
	private _sharedService: SharedService) {

    }
    
	cancel(event) {
		this.router.navigate(['/userList']);		
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		if (this.user.password !== this.oldPassword) {
			this.user.password = this._userService.MD5(this.user.password);
		}

		this._sharedService.makeRequest('POST', '/user/update/' + this.user.id, JSON.stringify(this.user)).then((data: any) => {
			alert("修改成功");
			//go back to the school list page
			this.router.navigate(['userList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
			//go back to the school list page
			this.router.navigate(['userList']);
		});
	}

	reload() {
		this._sharedService.makeRequest('GET', '/user/view/' + this.route.snapshot.params.id, '').then((data: any) => {
			this.user = data;
			this.oldPassword = data.password;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}

    ngOnInit(): void {
		this.updateForm = this.fb.group({
			userId: ["", Validators.required],
			userName: ["", Validators.required],
			password: ["", Validators.required],
			province: ["", Validators.required],
			city: ["", Validators.required],
			district: ["", Validators.required],
			type: ["", Validators.required]
		});
		this.provinces = this._userService.getProvinces();
        this.cities = this._userService.getCities();
        this.districts = this._userService.getDistricts();
        this.types = this._userService.getTypes();

		this.reload();
    }
}