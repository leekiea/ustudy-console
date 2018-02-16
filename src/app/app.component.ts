import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
    selector: 'ustudy-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    pageTitle: string = '蘑菇云后台管理系统';
    userName: string = '';

	constructor(private router: Router, public _sharedService: SharedService) {

	}

    ngOnInit() : void {
	    this.updateUserStatus();
    }

	checkUserStatus(): void {
		console.log("check log in status");
		if (this._sharedService.userName === '') {
		this.router.navigate(['login']);
		}
	}
	
	checkPerm(page: string): boolean {
    	return this._sharedService.checkPerm(page);
  	}

	logout(): void {
		this._sharedService.makeRequest('GET', '/logout', '').then((data: any) => {
		alert("您已退出");
		this._sharedService.userName = '';
		this._sharedService.userId = '';
		this._sharedService.userRole = '';
		this.router.navigate(['welcome']);
		}).catch((error: any) => {
		alert("退出失败");
		this._sharedService.userName = '';
		this._sharedService.userId = '';
		this._sharedService.userRole = '';
		this.router.navigate(['welcome']);
		});
	}

	updateUserStatus() {
		console.log("update user status");
		this._sharedService.makeRequest('GET', '/loginId', '').then((data: any) => {
			if(data.success === true) {
				console.log("data: " + JSON.stringify(data));
				this._sharedService.userName = data.data.userName === undefined ? '' : data.data.userName;
				this._sharedService.userId = data.data.userId === undefined ? '' : data.data.userId;
				this._sharedService.userRole = data.data.role === undefined ? '' : data.data.role;
			}
		}).catch((error: any) => {
			this._sharedService.userName = '';
			this._sharedService.userId = '';
			this._sharedService.userRole = '';
			console.log(error.status);
			console.log(error.statusText);
		});
	}
}
