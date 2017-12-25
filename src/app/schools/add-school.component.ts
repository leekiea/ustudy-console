import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool, IGrade, ISubject } from './school';
import { SchoolService } from './school.service';

@Component({
    templateUrl: 'add-school.component.html'
})

export class AddSchoolComponent implements OnInit {

	public addForm : FormGroup;
    
	errorMessage: string;

    school: ISchool = {
		'schoolName' : '',
		'schoolId' : '',
		'schoolType' : '',
		'province' : '',
		'city' : '',
		'district' : '',
		'grades' : []
	};

	provinces = [];
	
	cities = [];
	
	districts = [];
	
	types = [];
	
	constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {

    }

    configSubjects(event) {
    	this._schoolService.setPersistData(this.school);
		this.router.navigate(['/subject', {origin: 'addSchool'}]);
    }

	cancel(event) {
		this._schoolService.resetPersistData();
		this.router.navigate(['schoolList']);
	}

	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.school.grades = this._schoolService.washGrades(this.school.grades);

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8081/dashboard/school/add');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that._schoolService.resetPersistData();
			if (req.readyState == 4 && req.status == 200) {
				alert("添加成功");
				//go back to the school list page
				that.router.navigate(['schoolList']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("添加失败！");
				//go back to the school list page
				that.router.navigate(['schoolList']);
			}
		}
		req.send(JSON.stringify(this.school));
	}
		
    ngOnInit(): void {
		this.addForm = this.fb.group({
			schoolId: ["", Validators.required],
			schoolName: ["", Validators.required],
			province: ["", Validators.required],
			city: ["", Validators.required],
			district: ["", Validators.required],
			type: ["", Validators.required],
			grade: [""]
		});
		this.provinces = this._schoolService.getProvinces();
        this.cities = this._schoolService.getCities();
        this.districts = this._schoolService.getDistricts();
        this.types = this._schoolService.getTypes();

    	var school: ISchool = this._schoolService.getPersistData();

    	if (!school) {
			this.school.grades = this._schoolService.getDefaultGrades();
	   	} else {
			this.school = school;
		}
    }
}
