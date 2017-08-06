/* Defines the console b user entity */
export interface IBUser {
	id?: string;
    userId: string;
    userName: string;
    password?: string;
    orgType: string;
    orgId: string;
    userStatus?: string;
    lastLoginTime?: string;
}