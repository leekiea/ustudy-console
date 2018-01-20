import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IBUser } from './buser';
import { BUserService } from './buser.service';

@Component({
    templateUrl: 'update-buser.component.html'
})

export class UpdateBUserComponent implements OnInit {

	public updateForm : FormGroup;
    
	errorMessage: string;

    user: IBUser = {
    	'id' : '',
		'userName' : '',
		'userId' : '',
		'password' : '',
		'orgType' : '',
		'orgId' : '',
		'role' : ''
	};

	types = [{"orgType": "学校", "roles":[{"n": "考务老师"}, {"n": "校长"}]}, 
			{"orgType": "教研室", "roles":[{"n": "考务老师"}, {"n": "教研主任"}]}
	];

	oldPassword: string = "";

	constructor(private _userService: BUserService, public fb: FormBuilder, public route: ActivatedRoute, public router: Router) {

    }
    
	cancel(event) {
		this.router.navigate(['/ownerList']);		
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
		req.open('POST', 'http://39.107.93.245:8081/dashboard/owner/update');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status/100 == 2) {
				alert("修改成功");
				//go back to the school list page
				that.router.navigate(['ownerList']);
			} else if (req.readyState == 4 && req.status/100 != 2) {
				alert("修改失败！");
				//go back to the school list page
				that.router.navigate(['ownerList']);
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
		req.open('GET', 'http://39.107.93.245:8081/dashboard/owner/view/' + this.route.snapshot.params.id);
		//req.open('GET', 'assets/api/users/user.json');
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
			orgType: ["", Validators.required],
			orgId: ["", Validators.required],
			role: ["", Validators.required]
		});

		this.reload();
    }
}