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

    schools: ISchool[];

	provinces = [];
	
	cities = [];
	
	districts = [];
	
	types = [];
	
	public grades: IGrade[];

	constructor(private _schoolService: SchoolService, public fb: FormBuilder, public route: ActivatedRoute, private router: Router) {

    }

    configSubjects(event) {
    	var school: ISchool = {
			"schoolId": "",
			"schoolName": "",
			"province": "",
			"city": "",
			"district": "",
			"schoolType": ""
		};
    
		school.schoolId = this.addForm.controls.schoolId.value;
		school.schoolName = this.addForm.controls.schoolName.value;
		school.province = this.addForm.controls.province.value;
		school.city = this.addForm.controls.city.value;
		school.district = this.addForm.controls.district.value;
		school.schoolType = this.addForm.controls.type.value;

    	this._schoolService.setPersistData(school);
		this.router.navigate(['subject', {"grades" : JSON.stringify(this.grades), "isAdd" : true}]);
    }
    
	add(event) {
		if (this.addForm.status == "INVALID") {
			alert("信息不完整");
			return;
		}
		
    	var school: ISchool = {
			"schoolId": "",
			"schoolName": "",
			"province": "",
			"city": "",
			"district": "",
			"schoolType": "",
			"grades": []
		};
		school.schoolId = this.addForm.controls.schoolId.value;
		school.schoolName = this.addForm.controls.schoolName.value;
		school.province = this.addForm.controls.province.value;
		school.city = this.addForm.controls.city.value;
		school.district = this.addForm.controls.district.value;
		school.schoolType = this.addForm.controls.type.value;
		school.grades = this.washGrades(this.grades);

		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/dashboard/school/add');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			that._schoolService.resetPersistData();
			if (req.readyState == 4 && req.status == 201) {
				alert("添加成功");
				//go back to the school list page
				that.router.navigate(['school']);
			} else if (req.readyState == 4 && req.status != 201) {
				alert("添加失败！");
				//go back to the school list page
				that.router.navigate(['school']);
			}
		}
		req.send(JSON.stringify(school));
	}
		
    ngOnInit(): void {
    	var school: ISchool = this._schoolService.getPersistData();
    	if (!school) {
			this.addForm = this.fb.group({
				schoolId: ["", Validators.required],
				schoolName: ["", Validators.required],
				province: ["", Validators.required],
				city: ["", Validators.required],
				district: ["", Validators.required],
				type: ["", Validators.required],
				grade: [""]
			});
	   	} else {
			this.addForm = this.fb.group({
				schoolId: [school.schoolId, Validators.required],
				schoolName: [school.schoolName, Validators.required],
				province: [school.province, Validators.required],
				city: [school.city, Validators.required],
				district: [school.district, Validators.required],
				type: [school.schoolType, Validators.required],
				grade: [""]
			});
   		}
        this.provinces = this._schoolService.getProvinces();
        this.cities = this._schoolService.getCities();
        this.districts = this._schoolService.getDistricts();
        this.types = this._schoolService.getTypes();
        if (this.route.snapshot.params.hasOwnProperty("grades") === false) {
        	this.grades = this._schoolService.getDefaultGrades();
        } else {
        	this.grades = JSON.parse(this.route.snapshot.params.grades);
        }
    }
    
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
}
