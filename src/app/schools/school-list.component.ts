import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool } from './school';
import { SchoolService } from './school.service';

@Component({
    templateUrl: 'school-list.component.html'
})

export class SchoolListComponent implements OnInit {

	public searchForm = this.fb.group({
		schoolNameId: [""],
		provinceName: [""],
		cityName: [""],
		districtName: [""],
		type: [""]
	});
	
    errorMessage: string;

    schools: ISchool[];

	provinces = [];
	
	cities = [];
	
	districts = [];
	
	types = [];
	
	rows = [];
	
	temp = [];
	
	selected = [];
	
	columns = [
		{ prop: 'schoolName', name: '学校名称' },
		{ prop: 'type', name: '学校类型' },
		{ prop: 'schoolId', name: '学校ID' }
	];
	
    constructor(private _schoolService: SchoolService, private elm: ElementRef, public fb: FormBuilder, private router: Router) {
		this.elm = elm;
    }

	search(event) {
		console.log(event);
		console.log(this.searchForm.value);
	}
		
    ngOnInit(): void {
		this.reload();
        this.provinces = this._schoolService.getProvinces();
        this.cities = this._schoolService.getCities();
        this.districts = this._schoolService.getDistricts();
        this.types = this._schoolService.getTypes();
	   }
	
	reload() {
		this.fetch((data) => {
			//cache the list
			console.log("data: " + JSON.stringify(data));
			this.temp = [...data];
			this.rows = data;
		});		
	}
	
	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open('GET', 'http://47.92.53.57:8080/dashboard/school/list/0');
		//req.open('GET', 'assets/api/schools/schools.json');
		req.onload = () => {
			console.log("response: " + req.response.toString());
			cb(JSON.parse(req.response));
		};
		
		req.send();
	}	
	
	updateFilter(event) {
		const provinceName = this.elm.nativeElement.querySelector('#provinceFilterValue').value;
		const cityName = this.elm.nativeElement.querySelector('#cityFilterValue').value;
		const districtName = this.elm.nativeElement.querySelector('#districtFilterValue').value;
		const type = this.elm.nativeElement.querySelector('#typeFilterValue').value;
		const schoolNameId = this.elm.nativeElement.querySelector('#schoolNameIdFilterValue').value;		
			
		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.province.indexOf(provinceName) !== -1 
			&& d.city.indexOf(cityName) !== -1
			&& d.district.indexOf(districtName) !== -1
			&& d.schoolType.indexOf(type) !== -1
			&& (d.schoolName.indexOf(schoolNameId) !== -1 || d.schoolId.indexOf(schoolNameId) !== -1);
		});
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//this.table.offset = 0;
	}
	
	removeSchool(event) {
		var ids = [];
		console.log("length:" + this.selected.length);
		for(var i=0; i<this.selected.length; i++) {
			// 学校ID是否唯一和必须？还需要数据库id吗
			var j = {"id" : ""};
			j.id = this.selected[i].id;
			console.log("remove schools:" + j.id);
			ids.push(j);
		}
		
		console.log("remove schools:" + JSON.stringify(ids) );
		this.remove(JSON.stringify(ids));
	}
	
	remove(ids) {
		const req = new XMLHttpRequest();
		req.open('POST', 'http://47.92.53.57:8080/dashboard/school/delete');
		req.setRequestHeader("Content-type", "application/json");
		var that = this;
		req.onreadystatechange = function() {
			if (req.readyState == 4 && req.status == 200) {
				that.reload();
				alert("删除成功！");
			} else if (req.readyState == 4 && req.status != 200) {
				alert("删除失败！");
			}
		}		
		req.send(ids);
	}

	updateSchool(row) {
    	var school = {
			"id": "",
			"schoolId": "",
			"schoolName": "",
			"province": "",
			"city": "",
			"district": "",
			"schoolType": "",
			"grades": ""
		};

		school.id = row.id;
		school.schoolId = row.schoolId;
		school.schoolName = row.schoolName;
		school.province = row.province;
		school.city = row.city;
		school.district = row.district;
		school.schoolType = row.schoolType;
		for(let i=0; i< this.rows.length; i++) {
			if (this.rows[i].schoolId == row.schoolId) {
				school.grades = JSON.stringify(this.rows[i].grades);
				break;
			}
		}

		this.router.navigate(['updateSchool', school]);
	}	
}
