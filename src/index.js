// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const parseArgs = require( 'minimist' );

// Project
const hexScraper = require( './lib/hex-scraper' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var ARGS = parseArgs( process.argv.slice( 2 ) );

// --------------------------------------------------
// INIT
// --------------------------------------------------
hexScraper( ARGS );
