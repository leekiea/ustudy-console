import { Component, OnInit}  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool, IGrade } from './school';
import { SchoolService } from './school.service';

@Component({
    templateUrl: 'config-subjects.component.html'
})

export class ConfigSubjectsComponent implements OnInit {

	public configSubjectsForm : FormGroup;
	
	grades: IGrade[];
	
	origin: string;
	
    errorMessage: string;

    schools: ISchool[];
		
    constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {
		
    }
	
	config(event) {
		if (this.configSubjectsForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		alert("修改成功");
		//go back to the add/update school page
		this.router.navigate([this.origin, {grades : JSON.stringify(this.grades)}]);
	}
		
    ngOnInit(): void {
    	if (!this.route.snapshot.params.hasOwnProperty("grades") || this.route.snapshot.params.grades.length <=0 ) {
    		alert("请先选择年级！");
			if (this.route.snapshot.params.origin !== undefined) {
    			this.router.navigate([this.route.snapshot.params.origin]);
			}
    	}
    	this.grades = JSON.parse(this.route.snapshot.params.grades);
    	
    	this.origin = this.route.snapshot.params.origin;
    	
		this.configSubjectsForm = this.fb.group({
			subject: [""],
			numOfClasses: ["", Validators.required]
		});
    }
}
