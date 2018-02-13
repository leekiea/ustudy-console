import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from './user';
import { UserService } from './user.service';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'add-user.component.html'
})

export class AddUserComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

    user: IUser = {
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
	
	constructor(private _userService: UserService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router, 
	private _sharedService: SharedService) {

    }

	cancel(event) {
		this.router.navigate(['userList']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.user.password = this._userService.MD5(this.user.password);

		this._sharedService.makeRequest('POST', '/user/add', JSON.stringify(this.user)).then((data: any) => {
			alert("添加成功");
			//go back to the school list page
			this.router.navigate(['userList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("添加失败！");
			//go back to the school list page
			this.router.navigate(['userList']);
		});
	}
		
    ngOnInit(): void {
		this.addForm = this.fb.group({
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
    }
}
