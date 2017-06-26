import { Component, OnInit}  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool, IGrade } from './school';
import { SchoolService } from './school.service';

@Component({
    templateUrl: 'config-subjects.component.html'
})

export class ConfigSubjectsComponent implements OnInit {

	origin: string;
	
    errorMessage: string;

    public school: ISchool;
		
    constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	config(event) {
		this._schoolService.setPersistData(this.school);
		console.log("******persist config data: " + JSON.stringify(this.school));
		alert("修改成功");
		//go back to the add/update school page
		this.router.navigate([this.origin]);
	}
	
    ngOnInit(): void {

		this.school = this._schoolService.getPersistData();

		console.log("get persist data: " + JSON.stringify(this.school));
    	if (!this.school || !this.school.grades || this.school.grades.length <= 0 ) {
    		alert("请先选择年级！");
			if (this.route.snapshot.params.origin !== undefined) {
    			this.router.navigate([this.route.snapshot.params.origin]);
			}
    	}

    	this.origin = this.route.snapshot.params.origin;
    }
}
