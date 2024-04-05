// Archivo con la interfaz de un ticket

export interface Ticket {

	id: string,
	number: number,
	createdAt: Date,
	handleAtDesk?: string,
	handleAt?: Date,
	done: boolean,
}