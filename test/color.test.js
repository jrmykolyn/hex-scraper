// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const test = require( 'ava' );

// Project
/// TODO[@jrmykolyn]: Explain need for `.default` prop.
const Color = require( '../dist/lib/modules/color' ).default;

// --------------------------------------------------
// DECLARE TESTS
// --------------------------------------------------
// MODULE TESTS
test( 'It should be importable', ( t ) => {
	t.plan( 1 );
	t.truthy( Color );
} );

// CLASS TESTS
test( 'Class should expose the `rgbToHex()` method.', ( t ) => {
	t.plan( 1 );
	t.is( typeof Color.rgbToHex, 'function' );
} );

test( 'Class should expose the `getHex()` method.', ( t ) => {
	t.plan( 1 );
	t.is( typeof Color.getHex, 'function' );
} );

test( 'Class should expose the `hexToHsl()` method.', ( t ) => {
	t.plan( 2 );

	t.is( typeof Color.hexToHsl, 'function' );

	t.true( Array.isArray( Color.hexToHsl( '#ffffff' ) ) );
} );


test( 'Class should expose the `getOpacity()` method.', ( t ) => {
	t.plan( 1 );
	t.is( typeof Color.getHex, 'function' );
} );

// INSTANCE TESTS
test( 'It should be instantiable.', ( t ) => {
	t.plan( 1 );

	let color = new Color( '#fff' );

	t.true( color instanceof Color );
} );

test( 'It should throw an error when instantiated with missing or invalid arguments.', ( t ) => {
	t.throws( () => {
		let color = new Color();
	} );
} );

test( 'It should expose the `getHsl()` instance method.', ( t ) => {
	t.plan( 3 );

	let color = new Color( '#fff' );

	let hslDefault = color.getHsl();
	t.true( typeof hslDefault === 'object' && Array.isArray( hslDefault ) );

	let hslObj = color.getHsl( { as: 'object' } );
	t.true( typeof hslObj === 'object' );

	let hslStr = color.getHsl( { as: 'string' } );
	t.true( typeof hslStr === 'string' );
} );

test( 'It should expose the `isTransparent()` instance method.', ( t ) => {
	t.plan( 2 );

	let color = new Color( '#fff' );

	t.is( typeof color.isTransparent, 'function' );
	t.is( typeof color.isTransparent(), 'boolean' );
} );

test( 'It should expose the `toSwatch()` instance method.', ( t ) => {
	t.plan( 2 );

	let color = new Color( '#fff' );

	t.is( typeof color.toSwatch, 'function' );
	t.is( typeof color.toSwatch(), 'string' );
} );

test( 'It should expose the `getSwatchDeclarations()` instance method.', ( t ) => {
	t.plan( 3 );

	let color = new Color( '#fff' );

	t.is( typeof color.getSwatchDeclarations, 'function' );
	t.is( typeof color.getSwatchDeclarations(), 'object' );
	t.true( Array.isArray( color.getSwatchDeclarations() ) );
} );

test( 'It should expose the `getOpaqueSwatchDeclarations()` instance method.', ( t ) => {
	t.plan( 3 );

	let color = new Color( '#fff' );

	t.is( typeof color.getOpaqueSwatchDeclarations, 'function' );
	t.is( typeof color.getOpaqueSwatchDeclarations(), 'object' );
	t.true( Array.isArray( color.getOpaqueSwatchDeclarations() ) );
} );

test( 'It should expose the `getTransparentSwatchDeclarations()` instance method.', ( t ) => {
	t.plan( 3 );

	let color = new Color( '#fff' );

	t.is( typeof color.getTransparentSwatchDeclarations, 'function' );
	t.is( typeof color.getTransparentSwatchDeclarations(), 'object' );
	t.true( Array.isArray( color.getTransparentSwatchDeclarations() ) );
} );
