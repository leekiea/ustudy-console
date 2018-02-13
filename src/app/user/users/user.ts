/* Defines the console user entity */
export interface IUser {
	id?: string;
    userId: string;
    userName: string;
    password?: string;
    userType: string;
    userStatus?: string;
    lastLoginTime?: string;
    province: string;
    city: string;
    district: string;
}