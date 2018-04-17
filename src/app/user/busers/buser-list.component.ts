import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBUser } from './buser';
import { BUserService } from './buser.service';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'buser-list.component.html'
})

export class BUserListComponent implements OnInit {

    users: IBUser[];

	rows = [];
	
	selected = [];
	
	columns = [
		{ prop: 'userName', name: '姓名' },
		{ prop: 'userId', name: '手机号（账号）' },
		{ prop: 'role', name: '账号类型' },
		{ prop: 'orgType', name: '单位类型' },
		{ prop: 'orgId', name: '单位ID' },
		{ prop: 'userStatus', name: '状态' },
		{ prop: 'lastLoginTime', name: '上次登录时间' }
	];
	
    constructor(private _userService: BUserService, private router: Router, private _sharedService: SharedService) {

    }
		
    ngOnInit(): void {
		this.reload();	   
	}
	
	reload() {
		//req.open('GET', 'assets/api/users/busers.json');
		this._sharedService.makeRequest('GET', '/owner/list/0', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.rows = data;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}
	
	removeBUser(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var i=0; i<this.selected.length; i++) {
			var j = {"id" : 0};
			j.id = this.selected[i].id;
			console.log("remove users:" + j.id);
			ids.push(j);
		}
		
		console.log("remove users:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		this._sharedService.makeRequest('POST', '/owner/delete', ids).then((data: any) => {
			this.reload();
			alert("删除成功！");
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("删除失败！");
		});
	}

	updateBUser(row) {
		this.router.navigate(['updateOwner', {id: row.id}]);
	}
}
