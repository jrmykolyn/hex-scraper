// Import module.
const hexScraper = require( '../../dist' );

// Invoke exposed function.
hexScraper( {
	outFile: `${__dirname}/../dist/index.html`,
} );
