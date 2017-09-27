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
    const colors = ( inputSrc.match( /(#[a-f0-9]{3,6})|rgba?\(\s?(([0-9\.]+),?\s?){3,4}\s?\)/gmi ) || [] );

    // Filter out duplicate colors.
    const colorsUnique = colors.filter( ( color, index, arr ) => { return arr.indexOf( color ) === index; } );

    // Convert all non-hex colors (eg. `rgb()`/`rgba()`) to hex codes.
    const colorsFlattened = colorsUnique.map( ( color ) => {
        if ( color.substring( 0, 1 ) === '#' ) {
            return color;
        } else {
            return utils.rgbToHex( color );
        }
    } );

    // Assemble output.
    const output = colorsFlattened
        .sort()
        .map( ( color ) => {
            return `<div style="width: 100px; height: 100px; display: block; background: ${color}; float: left;"></div>`;
        } )
        .reduce( ( a, b ) => {
            return `${a}${b}`;
        }, '' );

    // Inject output into template.
    const templateDist = templateSrc.replace( /\{\{\s?SWATCH_MARKUP\s?\}\}/gmi, output );

    // Write compiled template to file system.
    fs.writeFileSync( args.outFile || CONFIG.defaults.outFile, templateDist );
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = hexScraper;
