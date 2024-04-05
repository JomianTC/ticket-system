// Archivo principal de la aplicacion
import { createServer } from 'http';
import { envs } from './config/envs.adapter';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';
import { AppRoutes } from './presentation/routes';

( async () => {
	main();
})();

function main() {

	const server = new Server({
		port: envs.PORT,
	});

	const httpServer = createServer( server.app );
	WssService.initWss({ server: httpServer });

	server.setRoutes( AppRoutes.routes );

	httpServer.listen( envs.PORT, () => {
		console.log( "Servidor iniciado en el puerto: ", envs.PORT );
		
	});
}