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

    schools: ISchool[];

	provinces = [];
	
	cities = [];
	
	districts = [];
	
	types = [];

	id = "";
	
	public grades: IGrade[];

	constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {

    }

    configSubjects(event) {
    	var school: ISchool = {
			"id": "",
			"schoolId": "",
			"schoolName": "",
			"province": "",
			"city": "",
			"district": "",
			"schoolType": ""
		};
		
		school.id = this.id;
		school.schoolId = this.updateForm.controls.schoolId.value;
		school.schoolName = this.updateForm.controls.schoolName.value;
		school.province = this.updateForm.controls.province.value;
		school.city = this.updateForm.controls.city.value;
		school.district = this.updateForm.controls.district.value;
		school.schoolType = this.updateForm.controls.type.value;

    	this._schoolService.setPersistData(school);
		this.router.navigate(['subject', {grades : JSON.stringify(this.grades), origin : 'updateSchool'}]);
    }
    
	update(event) {
		if (this.updateForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
    	var school: ISchool = {
			"id": "",
			"schoolId": "",
			"schoolName": "",
			"province": "",
			"city": "",
			"district": "",
			"schoolType": "",
			"grades": []
		};
		school.id = this.id;
		school.schoolId = this.updateForm.controls.schoolId.value;
		school.schoolName = this.updateForm.controls.schoolName.value;
		school.province = this.updateForm.controls.province.value;
		school.city = this.updateForm.controls.city.value;
		school.district = this.updateForm.controls.district.value;
		school.schoolType = this.updateForm.controls.type.value;
		school.grades = this.washGrades(this.grades);

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/dashboard/school/update/' + school.id);
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
		req.send(JSON.stringify(school));
	}
		
    ngOnInit(): void {
    	var school: ISchool = this._schoolService.getPersistData();
    	if (!school) {
			this.updateForm = this.fb.group({
				schoolId: [this.route.snapshot.params.schoolId, Validators.required],
				schoolName: [this.route.snapshot.params.schoolName, Validators.required],
				province: [this.route.snapshot.params.province, Validators.required],
				city: [this.route.snapshot.params.city, Validators.required],
				district: [this.route.snapshot.params.district, Validators.required],
				type: [this.route.snapshot.params.schoolType, Validators.required],
				grade: [""]
			});
			this.id = this.route.snapshot.params.id;
	   	} else {
			this.updateForm = this.fb.group({
				schoolId: [school.schoolId, Validators.required],
				schoolName: [school.schoolName, Validators.required],
				province: [school.province, Validators.required],
				city: [school.city, Validators.required],
				district: [school.district, Validators.required],
				type: [school.schoolType, Validators.required],
				grade: [""]
			});
			this.id = school.id;
   		}
        this.provinces = this._schoolService.getProvinces();
        this.cities = this._schoolService.getCities();
        this.districts = this._schoolService.getDistricts();
        this.types = this._schoolService.getTypes();
		let oldGrades = JSON.parse(this.route.snapshot.params.grades);
		this.grades = this.constructGrades(oldGrades);
    }
    
	// remove unselected items from the grades
    washGrades(oldGrades:IGrade[]): IGrade[] {
    	let newGrades: IGrade[] = [];
    	for (let i=0; i< oldGrades.length; i++) {
    		let curGrade = oldGrades[i];
    		if (curGrade.checked === false) {
    			continue;
    		} else {
    			let tmpGrade: IGrade = {
					"grade": "",
					"numOfClasses": 0,
					"subjects": []
				};
    			tmpGrade.grade = curGrade.grade;
    			tmpGrade.numOfClasses = curGrade.numOfClasses;
    			let tmpSubjects: ISubject[] = [];
    			for (let j=0; j < curGrade.subjects.length; j++) {
    				let curSubject = curGrade.subjects[j];
    				if (curSubject.checked === false) {
    					continue;
    				} else {
    					let tmpSubject: ISubject = {
							"subject": ""
						};
    					tmpSubject.subject = curSubject.subject;
    					tmpSubjects.push(tmpSubject);
    				}
    			}
    			tmpGrade.subjects = tmpSubjects;
    			newGrades.push(tmpGrade);
    		}
    	}
    	return newGrades;
    }

	// add unselected items into the grades and associate checked flag with all the items.
    constructGrades(oldGrades:IGrade[]): IGrade[] {
		var newGrades: IGrade[] = this._schoolService.getDefaultGrades();
		if (oldGrades.length <= 0) {
			return newGrades;
		} else if (oldGrades[0].checked !== undefined){
			return oldGrades;
		}
		for (var oldGrade of oldGrades) {
			for (var newGrade of newGrades) {
				if (newGrade.grade == oldGrade.grade) {
					newGrade.checked = true;
					newGrade.numOfClasses = oldGrade.numOfClasses;
					for (var oldSubject of oldGrade.subjects) {
						for (var newSubject of newGrade.subjects) {
							if (newSubject.subject == oldSubject.subject) {
								newSubject.checked = true;
							}
						}
					}
				}
			}
		}
    	return newGrades;
    }	

}