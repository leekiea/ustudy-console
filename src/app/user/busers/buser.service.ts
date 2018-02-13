import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Md5} from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IBUser } from './buser';

@Injectable()
export class BUserService {
	
  constructor(private _http: Http) { }

	MD5(pw: string): any {
    return Md5.hashStr(pw);
  }

}
