/*
Index.js - Entry point to serve up the WebGL Globe
*/

var express = require( 'express' );
var serveStatic = require( 'serve-static' );
var fs = require( 'fs' );

var _sampleData = JSON.parse( fs.readFileSync( './globe/sample-data.json' ) );

var app = express();

// For CORS
app.use( function( req, res, next ) {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.header( "Access-Control-Allow-Methods", "GET" );

  if( req.method == 'OPTIONS' ) {
    res.json( [] );
  } else {
    next();
  }
});

app.use( serveStatic( 'globe', { 'index': ['index.html', 'index.htm' ] } ) );

app.get( '/data', function( req, res ) {
  if( _sampleData.length == 0 ) {
    return res.json( [] );
  }

  res.json( _sampleData.splice( 0, 30 ) );
});

app.listen( 8080 );

console.log( 'Listening on port 8080...' );
