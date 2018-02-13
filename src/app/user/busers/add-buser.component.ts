import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IBUser } from './buser';
import { BUserService } from './buser.service';
import { SharedService } from '../../shared.service';

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

	constructor(private _userService: BUserService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router,
	private _sharedService: SharedService) {

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

		this._sharedService.makeRequest('POST', '/owner/add', JSON.stringify(this.user)).then((data: any) => {
			alert("添加成功");
			//go back to the school list page
			this.router.navigate(['ownerList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("添加失败！");
			//go back to the school list page
			this.router.navigate(['ownerList']);
		});
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
