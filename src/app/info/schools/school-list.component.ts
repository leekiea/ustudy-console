import { Component, OnInit, ElementRef }  from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ISchool } from './school';
import { SchoolService } from './school.service';
import { SharedService } from '../../shared.service';

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
	
    constructor(private _schoolService: SchoolService, private elm: ElementRef, public fb: FormBuilder,
	 private router: Router, private _sharedService: SharedService) {
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
		//req.open('GET', 'assets/api/schools/simpleSchools.json');
		this._sharedService.makeRequest('GET', '/school/list/0', '').then((data: any) => {
			console.log("data: " + JSON.stringify(data));
			this.temp = [...data];
			this.rows = data;
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
		});
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
		this._sharedService.makeRequest('POST', '/school/delete', ids).then((data: any) => {
			this.reload();
			alert("删除成功！");
		}).catch((error: any) => {
			console.log(error.status);
			console.log(error.statusText);
			alert("删除失败！");
		});
	}

	updateSchool(row) {
		this.router.navigate(['updateSchool', {id: row.id}]);
	}	
}
