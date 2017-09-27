// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
const CONFIG = require( './config' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function rgbToHex( colorStr ) {
	// Extract RGB values from `color`.
	var vals = colorStr.match( /([0-5]{1,3})/gmi );

	// Convert extracted `vals` to hex code.
	/// TODO[@jrmykolyn]: Make this not gross.
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
				return CONFIG.data.hexChars[ val === 16 ? 15 : val ];
			} );
		} )
		.reduce( ( a, b ) => {
			return `${a}${b[ 0 ]}${b[ 1 ]}`;
		}, '#' );

	return hex;
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
	rgbToHex,
};
