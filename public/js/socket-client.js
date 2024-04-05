
function connectToWebSockets() {

	const socket = new WebSocket( "ws://localhost:3000/ws" );

	socket.onmessage = ( event ) => {
		console.log( event.data );
	};

	socket.onclose = ( event ) => {
		console.log( "Conexion cerrada" );
		setTimeout(() => {
			console.log( "Reintentando conexion" );
			connectToWebSockets();
		}, 1500);

	};

	socket.onopen = ( event ) => {
		console.log( "Conectado" );
	};
}

connectToWebSockets();
