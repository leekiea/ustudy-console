import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ISchool, IGrade, ISubject } from './school';

@Injectable()
export class SchoolService {
	
	private persistData = {};
	
    private _schoolUrl = 'api/schools/schools.json';
	
	private provinces = ["陕西省"];
	
	private cities = ["西安市"];
	
	private districts = ["未央区", "莲湖区", "新城区", "碑林区", "灞桥区", "雁塔区", "阎良区", "临潼区",
	                     "长安区", "蓝田县", "周至县", "户县", "高陵县"]
	
	//完中：初中+高中， 补习：初三+高三
	private types = ["高中", "初中", "完中", "九年制", "小学", "十二年制", "补习", "其他"];

    constructor(private _http: Http) { }

//    getSchools(): Observable<ISchool[]> {
//        return this._http.get(this._schoolUrl)
//            .map((response: Response) => <ISchool[]>response.json())
//            .do(data => console.log('All: ' +  JSON.stringify(data)))
//            .catch(this.handleError);
//    }
//
//    getSchool(id: string): Observable<ISchool> {
//        return this.getSchools()
//            .map((schools: ISchool[]) => schools.find(p => p.schoolId === id));
//    }
	
	getProvinces(): string[] {
		return this.provinces;
	}

	getCities(): string[] {
		return this.cities;
	}

	getDistricts(): string[] {
			return this.districts;
	}
	
	getTypes(): string[] {
		return this.types;
	}
	
	getDefaultGrades(): IGrade[] {
		return 	[
       	  {	"grade": '高一', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "物理" ,"checked": false},
       		               {"subject": "化学" ,"checked": false},
       		               {"subject": "生物" ,"checked": false},
       		               {"subject": "政治" ,"checked": false},
       		               {"subject": "历史" ,"checked": false},
       		               {"subject": "地理" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		   "numOfClasses": 0,
       		   "checked": false
       	  },
       	  {	"grade": '高二', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "物理" ,"checked": false},
       		               {"subject": "化学" ,"checked": false},
       		               {"subject": "生物" ,"checked": false},
       		               {"subject": "政治" ,"checked": false},
       		               {"subject": "历史" ,"checked": false},
       		               {"subject": "地理" ,"checked": false},
       		               {"subject": "数学(文)" ,"checked": false},
                         {"subject": "其他" ,"checked": false}]
       		   "numOfClasses": 0,
       		   "checked": false
       	  },
       	  {	"grade": '高三', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "物理" ,"checked": false},
       		               {"subject": "化学" ,"checked": false},
       		               {"subject": "生物" ,"checked": false},
       		               {"subject": "政治" ,"checked": false},
       		               {"subject": "历史" ,"checked": false},
       		               {"subject": "地理" ,"checked": false},
       		               {"subject": "理综" ,"checked": false},
       		               {"subject": "文综" ,"checked": false},
       		               {"subject": "数学(文)" ,"checked": false},
                         {"subject": "其他" ,"checked": false}] 
       		  "numOfClasses": 0,
       		  "checked": false
       	  },
       	  {	"grade": '七年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "政治" ,"checked": false},
       		               {"subject": "历史" ,"checked": false},
       		               {"subject": "地理" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  },
       	  {	"grade": '八年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "物理" ,"checked": false},
       		               {"subject": "生物" ,"checked": false},
       		               {"subject": "政治" ,"checked": false},
       		               {"subject": "历史" ,"checked": false},
       		               {"subject": "地理" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  },
       	  {	"grade": '九年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "物理" ,"checked": false},
						             {"subject": "化学" ,"checked": false},
       		               {"subject": "生物" ,"checked": false},
       		               {"subject": "政治" ,"checked": false},
       		               {"subject": "历史" ,"checked": false},
       		               {"subject": "地理" ,"checked": false},
                         {"subject": "理综" ,"checked": false},
                         {"subject": "文综" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  },
       	  {	"grade": '一年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  }, 
       	  {	"grade": '二年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  }, 
       	  {	"grade": '三年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  }, 
       	  {	"grade": '四年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  }, 
       	  {	"grade": '五年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  }, 
       	  {	"grade": '六年级', 
       		  "subjects": [{"subject": "语文", "checked": false},
       		               {"subject": "数学", "checked": false},
       		               {"subject": "英语" ,"checked": false},
       		               {"subject": "其他" ,"checked": false}], 
       		  "numOfClasses": 0,
       		  "checked": false
       	  }
      	]; 
	}
	
	getPersistData(): ISchool {
		return this.persistData['_schoolInfo'];
	}
	
	setPersistData(data : ISchool) {
		this.persistData['_schoolInfo'] = data;
	}
	
	resetPersistData() {
		this.persistData['_schoolInfo'] = undefined;
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
		var newGrades: IGrade[] = this.getDefaultGrades();
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
	
//    private handleError(error: Response) {
//        // in a real world app, we may send the server to some remote logging infrastructure
//        // instead of just logging it to the console
//        console.error(error);
//        return Observable.throw(error.json().error || 'Server error');
//    }
}
