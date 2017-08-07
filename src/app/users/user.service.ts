import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IUser } from './user';

@Injectable()
export class UserService {
	
  private _userUrl = 'api/users/users.json';
	
	private provinces = ["陕西省"];
	
	private cities = ["西安市"];
	
	private districts = ["未央区", "莲湖区", "新城区", "碑林区", "灞桥区", "雁塔区", "阎良区", "临潼区",
	                     "长安区", "蓝田县", "周至县", "户县", "高陵县"]
	
	private types = ["运维", "市场", "代理商", "临时"];

  constructor(private _http: Http) { }

	getProvinces(): string[] {
		return this.provinces;
	}

	getCities(): string[] {
		return this.cities;
	}

	getDistricts(): string[] {
			return this.districts;
	}
	
	getTypes(): string[] {
		return this.types;
	}
	
	MD5(pw: string): any {
    return Md5.hashStr(pw);
  }

}
