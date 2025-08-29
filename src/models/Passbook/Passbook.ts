export interface IPassbook {
	id?: number;
	user_id: number;
	type: string;
	amount: number;
	balance: number;
	description?: string;
	transaction_id?: string;
	status?: string;
	category?: string;
	created_at?: Date;
}

export class Passbook implements IPassbook {
	id?: number;
	user_id: number;
	type: string;
	amount: number;
	balance: number;
	description?: string;
	transaction_id?: string;
	status?: string;
	category?: string;
	created_at?: Date;

	constructor(data: IPassbook) {
		this.id = data.id;
		this.user_id = data.user_id;
		this.type = data.type;
		this.amount = data.amount;
		this.balance = data.balance;
		this.description = data.description;
		this.transaction_id = data.transaction_id;
		this.status = data.status;
		this.category = data.category;
		this.created_at = data.created_at;
	}
}
// ...existing code...
