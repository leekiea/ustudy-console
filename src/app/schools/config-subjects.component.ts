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
	
	isAdd: boolean;
	
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
		if (this.isAdd === true) {
			this.router.navigate(['addSchool', {grades : JSON.stringify(this.grades)}]);
		} else {
			this.router.navigate(['updateSchool', {grades : JSON.stringify(this.grades)}]);
		}
	}
		
    ngOnInit(): void {
    	if (!this.route.snapshot.params.hasOwnProperty("grades") || this.route.snapshot.params.grades.length <=0 ) {
    		alert("请先选择年级！");
			if (this.route.snapshot.params.isAdd) {
    			this.router.navigate(['addSchool']);
			} else {
				this.router.navigate(['updateSchool']);
			}
    	}
    	this.grades = JSON.parse(this.route.snapshot.params.grades);
    	
    	this.isAdd = this.route.snapshot.params.isAdd;
    	
		this.configSubjectsForm = this.fb.group({
			subject: [""],
			numOfClasses: ["", Validators.required]
		});
    }
}
