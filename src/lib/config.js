// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
const pkgDir = require( 'pkg-dir' );

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const rootDir = pkgDir.sync( __dirname );

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = {
	data: {
		hexChars: '0123456789abcdef'.split( '' ),
	},
	defaults: {
		input: `${rootDir}/demo/src/styles.css`,
		template: `${rootDir}/demo/src/index.html`,
		outFile: `${process.cwd()}/index.html`,
	},
};
