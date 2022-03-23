const express = require( 'express' );
const dotenv = require( 'dotenv' );
const colors = require( 'colors' );
const cors = require( 'cors' );
const { json } = require( 'body-parser' );
const { nanoid } = require( 'nanoid' );

dotenv.config( { path: './config.env' } );

const app = express();

app.use( cors() );
app.use( json() );

let tasks = [
	{ title: 'learn HTML', id: nanoid(), completed: true },
	{ title: 'learn CSS', id: nanoid(), completed: false },
	{ title: 'learn JS', id: nanoid(), completed: true },
	{ title: 'learn React', id: nanoid(), completed: false },
	{ title: 'learn Redux', id: nanoid(), completed: true },
];

app.get( '/tasks', ( req, res ) => setTimeout( () => res.send( tasks ), 1000 ) );

app.post( '/tasks/add', ( req, res ) =>
{
	//const task = { title: req.body.title, id: nanoid(), completed: false };
	console.log( req.body );/////////////////////
	tasks.push( req.body );

	return res.sendStatus( 200 );
} );

app.patch( '/tasks/edit/:id', ( req, res ) =>
{
	const id = req.params.id;
	const index = tasks.findIndex( ( task ) => task.id == id );
	const completed = Boolean( req.body.completed );

	if ( index > -1 )
	{
		tasks[ index ].completed = completed;

		return res.sendStatus( 200 );
	}
} );

app.delete( '/tasks/delete/:id', ( req, res ) =>
{
	const id = req.params.id;
	const index = tasks.findIndex( ( task ) => task.id == id );

	if ( index > -1 )
	{
		tasks.splice( index, 1 );

		return res.sendStatus( 200 );
	}

} );

const PORT = 7000;

app.listen( PORT, console.log( `Server running on http://localhost:${ PORT }`.green.bold ) );
