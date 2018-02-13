import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from './user';
import { UserService } from './user.service';
import { SharedService } from '../../shared.service';

@Component({
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    users: IUser[];

	provinces = [];
	
	cities = [];
	
	districts = [];
	
	types = [];
	
	rows = [];
	
	selected = [];
	
	columns = [
		{ prop: 'userName', name: '姓名' },
		{ prop: 'userId', name: '手机号（账号）' },
		{ prop: 'userType', name: '类型' },
		{ prop: 'userStatus', name: '状态' },
		{ prop: 'lastLoginTime', name: '上次登录时间' }
	];
	
    constructor(private _userService: UserService, private router: Router, private _sharedService: SharedService) {

    }
		
    ngOnInit(): void {
		this.reload();
        this.provinces = this._userService.getProvinces();
        this.cities = this._userService.getCities();
        this.districts = this._userService.getDistricts();
        this.types = this._userService.getTypes();
	   }
	
	reload() {
		this._sharedService.makeRequest('GET', '/user/list/0', '').then((data: any) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.rows = data;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
	}

	removeUser(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var i=0; i<this.selected.length; i++) {
			var j = {"id" : ""};
			j.id = this.selected[i].id;
			console.log("remove users:" + j.id);
			ids.push(j);
		}
		
		console.log("remove users:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		this._sharedService.makeRequest('POST', '/user/delete', ids).then((data: any) => {
			this.reload();
			alert("删除成功！");
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("删除失败！");
		});
	}

	updateUser(row) {
		this.router.navigate(['updateUser', {id: row.id}]);
	}	
}
