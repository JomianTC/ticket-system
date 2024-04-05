// Archivo del servicio para los sockets usando SINGLETON
import { Server } from "http";
import { WebSocket, WebSocketServer } from "ws";

interface Options {
	server: Server;
	path?: string;
}

export class WssService {

	private static _instance: WssService;
	private wss: WebSocketServer;

	private constructor( options: Options ) {

		const { server, path = "/ws" } = options;
		this.wss = new WebSocketServer({ server, path });
		this.start();
	}

	static get instance(): WssService {
		if ( !WssService._instance )
			throw "WssService no esta inicializado";
		
		return WssService._instance;
	}

	public sendMessage( type: string, payload: Object ) {
		this.wss.clients.forEach( client => {
			if ( client.readyState === WebSocket.OPEN )
				client.send( JSON.stringify({ type, payload }));
		});
	}

	static initWss( options: Options ) {
		WssService._instance = new WssService( options );
	}

	public start() {
		
		this.wss.on( "connection", ( ws: WebSocket ) => {
			
			console.log( "Cliente conectado" );
			
			ws.on( "close", () => {
				console.log( "Cliente desconectado" );
			});
			
		});
	}
}
