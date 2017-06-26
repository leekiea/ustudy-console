import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool, IGrade, ISubject } from './school';
import { SchoolService } from './school.service';

@Component({
    templateUrl: 'update-school.component.html'
})

export class UpdateSchoolComponent implements OnInit {

	public updateForm : FormGroup;
    
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

	constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, public router: Router) {

    }

    configSubjects(event) {
    	this._schoolService.setPersistData(this.school);
		this.router.navigate(['/subject', {origin: 'updateSchool'}]);
    }
    
	cancel(event) {
		this._schoolService.resetPersistData();
		//go back to the school list page
		this.router.navigate(['/school']);		
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.school.grades = this._schoolService.washGrades(this.school.grades);

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/dashboard/school/update/' + this.school.id);
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that._schoolService.resetPersistData();
			if (req.readyState == 4 && req.status == 200) {
				alert("修改成功");
				//go back to the school list page
				that.router.navigate(['school']);
			} else if (req.readyState == 4 && req.status != 200) {
				alert("修改失败！");
				//go back to the school list page
				that.router.navigate(['school']);
			}
		}
		req.send(JSON.stringify(this.school));
	}

	reload() {
		this.fetch((data) => {
			this.school = data;
			this.school.grades = this._schoolService.constructGrades(this.school.grades);
		});		
	}

	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/dashboard/school/view/' + this.route.snapshot.params.id);
		//req.open('GET', 'assets/api/schools/school.json');
		req.onload = () => {
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	

    ngOnInit(): void {
		this.updateForm = this.fb.group({
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
			this.reload();
	   	} else {
			this.school = school;
		}
    }
}