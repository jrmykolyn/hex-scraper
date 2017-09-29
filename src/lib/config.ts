// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
import * as pkgDir from 'pkg-dir';

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
export const data = {
	hexChars: '0123456789abcdef'.split( '' ),
}

export const defaults = {
	input: `${rootDir}/demo/src/styles.css`,
	template: `${rootDir}/demo/src/index.html`,
	outFile: `${process.cwd()}/index.html`,
};
