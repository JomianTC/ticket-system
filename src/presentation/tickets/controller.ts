// Archivo controlador para las rutas de los tickets

import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController {

	// Inyeccion de dependencias WS
	constructor(
		private readonly ticketService = new TicketService()
	){}

	public getTickets = async ( _req: Request, res: Response ) => {		
		res.json( this.ticketService.tickets );
	}

	public getLastTicketNumber = async ( _req: Request, res: Response ) => {
		res.json( this.ticketService.lastTicketNumber );
	}

	public pendingTicket = async ( _req: Request, res: Response ) => {
		res.json( this.ticketService.pendingTickets );
	}

	public createTicket = async ( _req: Request, res: Response ) => {
		res.status( 201 ).json( this.ticketService.createTicket() );
	}

	public drawTicket = async ( req: Request, res: Response ) => {
		const { desk } = req.params;
		res.json( this.ticketService.drawTicket( desk ) );
	}

	public ticketFinished = async ( req: Request, res: Response ) => {
		const { ticketId } = req.params;
		res.json( this.ticketService.onFinishedTicket( ticketId ) );
	}

	public workingOn = async ( _req: Request, res: Response ) => {
		res.json( this.ticketService.workingOnTickets );
	}
}