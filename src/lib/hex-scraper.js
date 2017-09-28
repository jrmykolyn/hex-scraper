// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor

// Project
const utils = require( './utils' );
const CONFIG = require( './config' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function hexScraper( args ) {
	// Read source stylesheet.
	const inputSrc = ( args.data || fs.readFileSync( args.input || CONFIG.defaults.input, 'utf8' ) );

	// Read source output template.
	const templateSrc = fs.readFileSync( CONFIG.defaults.template, 'utf8' );

	// Get all colors from stylesheet.
	const colorsArr = utils.getColors( inputSrc );

	// Convert array of color strings to array of 'colorObjs'.
	const colorObjs =  utils.getColorObjects( colorsArr );

	// Assemble output: transparent swatches.
	const transparentSwatches = colorObjs
		.filter( ( colorObj ) => {
			/// TODO[@jrmykolyn]: Pull 'check' into dedicated method.
			return ( colorObj.opacity !== undefined && colorObj.opacity !== -1 );
		} )
		.map( ( colorObj ) => {
			return utils.getColorObjectMarkup( colorObj, { isTransparent: true } );
		} )
		.reduce( ( a, b ) => {
			return `${a}${b}`;
		}, '' );

	// Assemble output: opaque swatches.
	const opaqueSwatches = colorObjs
		.filter( ( colorObj ) => {
			/// TODO[@jrmykolyn]: Pull 'check' into dedicated method.
			return ( colorObj.opacity === undefined || colorObj.opacity === -1 );
		} )
		.map( ( colorObj ) => {
			return utils.getColorObjectMarkup( colorObj, { isTransparent: false } );
		} )
		.reduce( ( a, b ) => {
			return `${a}${b}`;
		}, '' );

	// Inject output into template.
	var templateDist = templateSrc;
	templateDist = templateDist.replace( /\{\{\s?TRANSPARENT_SWATCH_MARKUP\s?\}\}/gmi, transparentSwatches );
	templateDist = templateDist.replace( /\{\{\s?OPAQUE_SWATCH_MARKUP\s?\}\}/gmi, opaqueSwatches );

	// Write compiled template to file system.
	fs.writeFileSync( args.outFile || CONFIG.defaults.outFile, templateDist );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = hexScraper;
