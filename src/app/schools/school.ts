/* Defines the school entity */
export interface ISchool {
	id?: string;
    schoolId: string;
    schoolName: string;
    province: string;
    city: string;
    district: string;
    schoolType: string;
	grades?: IGrade[];
}

export interface IGrade {
	grade: string;
	subjects: ISubject[];
	numOfClasses: number;
	checked?: boolean;
}

export interface ISubject {
	subject: string;
	checked?: boolean;
}
