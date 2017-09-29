// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
import * as fs from 'fs';

// Vendor

// Project
import * as CONFIG from './config';

import SwatchCollection from './modules/swatch-collection';
import Color from './modules/color';

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

	// Parse input into collection of swatches.
	const swatchCollection = new SwatchCollection( inputSrc );

	// Assemble output: transparent swatches.
	const transparentSwatches = swatchCollection
		.transparent()
		.map( ( color ) => {
			return color.toSwatch();
		} )
		.reduce( ( a, b ) => {
			return `${a}${b}`;
		}, '' );

	// Assemble output: opaque swatches.
	const opaqueSwatches = swatchCollection
		.opaque()
		.map( ( color ) => {
			return color.toSwatch();
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
export = hexScraper;
