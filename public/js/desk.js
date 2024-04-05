// Archivo con la logica del manejo de los tickets en los escritorios

const labelPending = document.querySelector( "#lbl-pending" );
const deskLabel = document.querySelector( "h1" );
const noMoreAlert = document.querySelector( ".alert" );
const currentTicketLabel = document.querySelector( "small" );
const btnDraw = document.querySelector( "#btn-draw" );
const btnDone = document.querySelector( "#btn-done" );

const searchParams = new URLSearchParams( window.location.search );
if ( !searchParams.has( "escritorio" ) ){
	window.location = "index.html";
	throw new Error( "" );
}

const deskNumber = searchParams.get( "escritorio" );
let workingTicket = null;

deskLabel.innerText = deskNumber;

function checkTicketCount( initialCount = 0 ) {
	if ( initialCount === 0 )
		noMoreAlert.classList.remove( "d-none" );
	else
		noMoreAlert.classList.add( "d-none" );
	
	labelPending.innerHTML = initialCount;
}

async function loadInitialCount() {
	
	const pending = await fetch( "http://localhost:3000/api/ticket/pending" ).then( resp => resp.json() );
	checkTicketCount( pending.length );
}

async function getTicket() {

	await finishedTicket();
	
	const { status, ticket, message } = await fetch( `/api/ticket/draw/${ deskNumber }` )
		.then( resp => resp.json() );

	if ( status === "Error" ) {
		currentTicketLabel.innerText = message
		return;
	}

	workingTicket = ticket;
	currentTicketLabel.innerText = ticket.number;
}

async function finishedTicket() {

	if ( !workingTicket ) return;

	const { status, message } = await fetch( `/api/ticket/done/${ workingTicket.id }`, { method: "PUT" } )
		.then( resp => resp.json() );

	if ( status === "Error" ) {
		currentTicketLabel.innerText = message
		return;
	}

	workingTicket = null;
	currentTicketLabel.innerText = "Nadie";
}

function connectToWebSockets() {

	const socket = new WebSocket( "ws://localhost:3000/ws" );

	socket.onmessage = ( event ) => {
		const { type, payload } = JSON.parse( event.data )
		if ( type !== "on-ticket-count-change" ) return;

		checkTicketCount( payload );
	};

	socket.onclose = ( _event ) => {
		console.log( "Conexion cerrada" );
		setTimeout(() => {
			console.log( "Reintentando conexion" );
			connectToWebSockets();
		}, 1500);

	};

	socket.onopen = ( _event ) => {
		console.log( "Conectado" );
	};
}

btnDraw.addEventListener( "click", getTicket );
btnDone.addEventListener( "click", finishedTicket );

loadInitialCount();
connectToWebSockets();
