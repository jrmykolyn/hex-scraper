// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Vendor
var gulp = require( 'gulp' );
var sass = require( 'gulp-sass' );
var ts = require( 'gulp-typescript' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
/**
 * Wrapper around any/all tasks to be executed when `gulp` is run.
 */
gulp.task( 'default', [ 'build' ] );

/**
 * Wrapper around any/all build-related tasks.
 */
gulp.task( 'build', function() {
	gulp.src( "./src/**/*.ts" )
		.pipe( ts() )
		.pipe( gulp.dest( './dist' ) );
} );

/**
 * Wrapper around any/all style-related tasks.
 */
gulp.task( 'styles', function() {
	gulp.src( `${__dirname}/src/data/*.scss` )
		.pipe( sass( {
			outputStyle: 'expanded',
		} ) )
		.pipe( gulp.dest( `${__dirname}/src/data` ) );
} );
