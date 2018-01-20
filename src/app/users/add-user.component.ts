import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from './user';
import { UserService } from './user.service';

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
	
	constructor(private _userService: UserService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {

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

		const req = new XMLHttpRequest();
		req.open('POST', 'http://39.107.93.245:8081/dashboard/user/add');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("添加成功");
				//go back to the school list page
				that.router.navigate(['userList']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("添加失败！");
				//go back to the school list page
				that.router.navigate(['userList']);
			}
		}
		console.log("add user: " + JSON.stringify(this.user));
		req.send(JSON.stringify(this.user));
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
