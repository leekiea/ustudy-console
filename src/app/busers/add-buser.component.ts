import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IBUser } from './buser';
import { BUserService } from './buser.service';

@Component({
    templateUrl: 'add-buser.component.html'
})

export class AddBUserComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

	selectedOrgType: string;

	types = [{"orgType": "学校", "roles":[{"n": "考务老师"}, {"n": "校长"}]}, 
			{"orgType": "教研室", "roles":[{"n": "考务老师"}, {"n": "教研主任"}]}
	];
	
    user: IBUser = {
		'userName' : '',
		'userId' : '',
		'role': '',
		'password' : '',
		'orgType' : '',
		'orgId' : ''
	};

	constructor(private _userService: BUserService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {

    }

	cancel(event) {
		this.router.navigate(['ownerList']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.user.password = this._userService.MD5(this.user.password);

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8081/dashboard/owner/add');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				alert("添加成功");
				//go back to the school list page
				that.router.navigate(['ownerList']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("添加失败！");
				//go back to the school list page
				that.router.navigate(['ownerList']);
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
			orgType: ["", Validators.required],
			orgId: ["", Validators.required],
			role: ["", Validators.required]
		});
    }
}
