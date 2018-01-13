import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ustudy-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    pageTitle: string = '蘑菇云后台管理系统';
    userName: string = '';

	constructor(private router: Router) {

	}

    ngOnInit() : void {
        console.log("get user name...");
		this.getUserName();
    }

	logout(): void {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://59.110.51.177:8081/dashboard/logout');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status/100 == 2) {
				alert("您已退出");
				that.userName = '';
				that.router.navigate(['welcome']);
			} else if (req.readyState == 4 && req.status/100 != 2) {
				alert("退出失败！");
				that.router.navigate(['welcome']);
			}
		}
		req.send();
	}

    getUserName() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + data);
			this.userName = data===undefined ? '' : data;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://59.110.51.177:8081/dashboard/loginId');
		req.onload = () => {
			cb(req.response);
		};
		
		req.send();
	}	
}
