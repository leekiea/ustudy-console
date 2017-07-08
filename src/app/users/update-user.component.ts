import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from './user';
import { UserService } from './user.service';

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

	constructor(private _userService: UserService, public fb: FormBuilder, public route: ActivatedRoute, public router: Router) {

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

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/dashboard/user/update/' + this.user.id);
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the school list page
				that.router.navigate(['userList']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the school list page
				that.router.navigate(['userList']);
			}
		}
		console.log("update user: " + JSON.stringify(this.user));
		req.send(JSON.stringify(this.user));
	}

	reload() {
		this.fetch((data) => {
			this.user = data;
			this.oldPassword = data.password;
		});
	}

	fetch(cb) {
		const req = new XMLHttpRequest();
		//req.open('GET', 'http://47.92.53.57:8080/dashboard/user/view/' + this.route.snapshot.params.id);
		req.open('GET', 'assets/api/users/user.json');
		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
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