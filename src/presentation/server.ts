// Archivo con la logica del servidor
import express, { Router } from 'express';
import path from 'path';

// Interface con las opciones para el servidor
interface Options {
	port: number;
	public_path?: string;
}

export class Server {

	public readonly app = express();
	private serverListener?: any;
	private readonly port: number;
	private readonly publicPath: string;

	constructor( options: Options ) {

		const { port, public_path = "public" } = options;
		this.port = port;
		this.publicPath = public_path;
	
		this.configure();
	}

	private configure() {
		
		//* Middlewares
		this.app.use( express.json() );
		this.app.use( express.urlencoded({ extended: true }) );
		
		//* Public Folder
		this.app.use( express.static( this.publicPath ) );

		//* Routes
		// this.app.use( this.routes );

		// * SPA
		this.app.get( /^\/(?!api).*/, ( _req, res ) => {
			const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
			res.sendFile( indexPath );
		});
	}

	public setRoutes( router: Router ) {		
		this.app.use( router );
	}

	async start() {
		this.serverListener = this.app.listen( this.port, () => {
			console.log( `Servidor ejecutandose en el PUERTO: ${ this.port }` );
		});
	}

	// Metodo para parar el servidor
	public close() { this.serverListener?.close(); }
}
