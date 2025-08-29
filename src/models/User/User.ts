export interface IUser {
	id?: number;
	username: string;
	email: string;
	password: string;
	is_active?: boolean;
	role?: string;
	last_login?: Date | null;
	profile_picture?: string;
	phone_number?: string;
	updated_at?: Date;
	created_at?: Date;
}

export class User implements IUser {
	id?: number;
	username: string;
	email: string;
	password: string;
	is_active?: boolean;
	role?: string;
	last_login?: Date | null;
	profile_picture?: string;
	phone_number?: string;
	updated_at?: Date;
	created_at?: Date;

	constructor(data: IUser) {
		this.id = data.id;
		this.username = data.username;
		this.email = data.email;
		this.password = data.password;
		this.is_active = data.is_active;
		this.role = data.role;
		this.last_login = data.last_login;
		this.profile_picture = data.profile_picture;
		this.phone_number = data.phone_number;
		this.updated_at = data.updated_at;
		this.created_at = data.created_at;
	}
}
