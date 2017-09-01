import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IBUser } from './buser';
import { BUserService } from './buser.service';

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
	
    constructor(private _userService: BUserService, private router: Router) {

    }
		
    ngOnInit(): void {
		this.reload();	   
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
		req.open('GET', 'http://47.92.53.57:8080/dashboard/owner/list/0');
		//req.open('GET', 'assets/api/users/busers.json');
		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	

	removeBUser(event) {
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
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/dashboard/owner/delete');
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

	updateBUser(row) {
		this.router.navigate(['updateOwner', {id: row.id}]);
	}
}
