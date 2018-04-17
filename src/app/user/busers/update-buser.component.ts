import { Component, OnInit }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IBUser } from './buser';
import { BUserService } from './buser.service';
import { SharedService} from '../../shared.service';
@Component({
    templateUrl: 'update-buser.component.html'
})

export class UpdateBUserComponent implements OnInit {

	public updateForm : FormGroup;
    
	errorMessage: string;

    user: IBUser = {
    	'id' : 0,
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

	constructor(private _userService: BUserService, public fb: FormBuilder, public route: ActivatedRoute, public router: Router,
	private _sharedService: SharedService) {

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

		this._sharedService.makeRequest('POST', '/owner/update', JSON.stringify(this.user)).then((data: any) => {
			alert("修改成功");
			//go back to the school list page
			this.router.navigate(['ownerList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
			//go back to the school list page
			this.router.navigate(['ownerList']);
		});
	}

	reload() {
		this._sharedService.makeRequest('GET', '/owner/view/' + this.route.snapshot.params.id, '').then((data: any) => {
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
			orgType: ["", Validators.required],
			orgId: ["", Validators.required],
			role: ["", Validators.required]
		});

		this.reload();
    }
}