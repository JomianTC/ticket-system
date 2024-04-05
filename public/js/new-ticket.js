// Archivo con la logica de la creacion de los tickets

const currentTicketLabel = document.querySelector( "span" );
const createTicketButton = document.querySelector( "button" );

async function getLastTicket() {
	
	const lastTicket = await fetch( "http://localhost:3000/api/ticket/last" )
								.then( resp => resp.json() )
								.catch( error => console.log( error ) );

	currentTicketLabel.innerText = `Ticket ${ lastTicket }`;
}

createTicketButton.addEventListener( "click", async() => {
	const newTicket =  await fetch( "http://localhost:3000/api/ticket", { method: "POST" } )
							.then( resp => resp.json() )
							.catch( error => console.log( error ) );

	currentTicketLabel.innerText = `Ticket ${ newTicket.number }`;
});

getLastTicket();
