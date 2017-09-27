// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor
const parseArgs = require( 'minimist' );

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var ARGS = parseArgs( process.argv.slice( 2 ) );

var CONFIG = {
    hexChars: '0123456789abcdef'.split( '' ),
};

var DEFAULTS = {
    input: `${__dirname}/../demo/src/styles.css`,
    template: `${__dirname}/../demo/src/index.html`,
    outFile: `${process.cwd()}/index.html`,
};

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function rgbToHex( colorStr ) {
    // Extract RGB values from `color`.
    var vals = colorStr.match( /([0-5]{1,3})/gmi );

    // Convert extracted `vals` to hex code.
    /// TODO[@jrmykoyln]: Make this not gross.
    var hex = vals
        .slice( 0, 3 )
        .map( ( val ) => {
            return parseInt( val, 10 );
        } )
        .map( ( val ) => {
            var n = ( val / 255 ) * 16;

            if ( n % 1 === 0 ) {
                return [ n, n ];
            } else {
                return [
                    parseInt( n, 10 ),
                    Math.floor( ( n % 1 ) * 16 ),
                ];
            }
        } )
        .map( ( arr ) => {
            return arr.map( ( val, i ) => {
                return CONFIG.hexChars[ val === 16 ? 15 : val ];
            } );
        } )
        .reduce( ( a, b ) => {
            return `${a}${b[ 0 ]}${b[ 1 ]}`;
        }, '#' );

    return hex;
}

function init() {
    // Read source stylesheet.
    const inputSrc = fs.readFileSync( ARGS.input || DEFAULTS.input, 'utf8' );

    // Read source output template.
    const templateSrc = fs.readFileSync( DEFAULTS.template, 'utf8' );

    // Get all colors from stylesheet.
    const colors = ( inputSrc.match( /(#[a-f0-9]{3,6})|rgba?\(\s?(([0-9\.]+),?\s?){3,4}\s?\)/gmi ) || [] );

    // Filter out duplicate colors.
    const colorsUnique = colors.filter( ( color, index, arr ) => { return arr.indexOf( color ) === index; } );

    // Convert all non-hex colors (eg. `rgb()`/`rgba()`) to hex codes.
    const colorsFlattened = colorsUnique.map( ( color ) => {
        if ( color.substring( 0, 1 ) === '#' ) {
            return color;
        } else {
            return rgbToHex( color );
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

    console.log( 'LOGGING OUT `output`' );
    console.log( output );

    // Inject output into template.
    const templateDist = templateSrc.replace( /\{\{\s?SWATCH_MARKUP\s?\}\}/gmi, output );

    // Write compiled template to file system.
    fs.writeFileSync( ARGS.outFile || DEFAULTS.outFile, templateDist );
}

// --------------------------------------------------
// INIT
// --------------------------------------------------
init();
