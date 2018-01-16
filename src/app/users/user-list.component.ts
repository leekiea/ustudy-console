import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IUser } from './user';
import { UserService } from './user.service';

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
	
    constructor(private _userService: UserService, private router: Router) {

    }
		
    ngOnInit(): void {
		this.reload();
        this.provinces = this._userService.getProvinces();
        this.cities = this._userService.getCities();
        this.districts = this._userService.getDistricts();
        this.types = this._userService.getTypes();
	   }
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.rows = data;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8081/dashboard/user/list/0');
		//req.open('GET', 'assets/api/users/users.json');
		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	

	removeUser(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var i=0; i<this.selected.length; i++) {
			var j = {"id" : 0};
			j.id = Number(this.selected[i].id);
			console.log("remove users:" + j.id);
			ids.push(j);
		}
		
		console.log("remove users:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8081/dashboard/user/delete');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				that.reload();
				alert("删除成功！");
			} else if (req.readyState == 4 && req.status != 200) {
				alert("删除失败！");
			}
		}		
		req.send(ids);
	}

	updateUser(row) {
		this.router.navigate(['updateUser', {id: row.id}]);
	}	
}
