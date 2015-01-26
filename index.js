/*
Index.js - Entry point to serve up the WebGL Globe
*/

var express = require( 'express' );
var serveStatic = require( 'serve-static' );

var app = express();

app.use( serveStatic( 'globe', { 'index': ['index.html', 'index.htm' ] } ) );
app.listen( 8080 );

console.log( 'Listening on port 3000...' );
