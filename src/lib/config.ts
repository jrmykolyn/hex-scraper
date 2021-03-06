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
export const defaults = {
	input: `${rootDir}/src/data/styles.css`,
	template: `${rootDir}/src/views/index.html`,
	outFile: `${process.cwd()}/index.html`,
};
