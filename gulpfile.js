// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
var gulp = require( 'gulp' );
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
 * Wrapper around any/all style-related tasks.
 */
gulp.task( 'build', function() {
	gulp.src( "./src/**/*.ts" )
		.pipe( ts() )
		.pipe( gulp.dest( './dist' ) );
} );
