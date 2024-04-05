// Archivo con las rutas de nuestro servidor de express
import { Router } from 'express';
import { TicketRoutes } from './tickets/routes';

export class AppRoutes {

	static get routes(): Router {

		const router = Router();

		router.use( "/api/ticket", TicketRoutes.routes );

		return router;
	}
}
