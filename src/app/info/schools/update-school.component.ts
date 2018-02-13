import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool, IGrade, ISubject } from './school';
import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

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

	constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, 
	public router: Router, private _sharedService: SharedService) {

    }

    configSubjects(event) {
    	this._schoolService.setPersistData(this.school);
		this.router.navigate(['/subject', {origin: 'updateSchool'}]);
    }
    
	cancel(event) {
		this._schoolService.resetPersistData();
		//go back to the school list page
		this.router.navigate(['/schoolList']);		
	}

	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
		this.school.grades = this._schoolService.washGrades(this.school.grades);
		
		this._sharedService.makeRequest('POST', '/school/update/' + this.school.id, JSON.stringify(this.school)).then((data: any) => {
			alert("修改成功");
			//go back to the school list page
			this.router.navigate(['schoolList']);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("修改失败！");
			//go back to the school list page
			this.router.navigate(['schoolList']);
		});
	}

	reload() {
		this._sharedService.makeRequest('GET', '/school/view/' + this.route.snapshot.params.id, '').then((data: any) => {
			this.school = data;
			this.school.grades = this._schoolService.constructGrades(this.school.grades);
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
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