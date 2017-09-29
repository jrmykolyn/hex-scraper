// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
import Color from './color';

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export default class SwatchCollection {
	// CLASS PROPERTIES
	static colorRegex: any = /(#[a-f0-9]{3,6})|rgba?\(\s?(([0-9\.]+),?\s?){3,4}\s?\)/gmi;

	// INSTANCE PROPERTIES
	colors: Array<any>;

	// CLASS METHODS
	static extractColors( input ) {
		if ( !input || typeof input !== 'string' ) {
			return null;
		}

		return ( input.match( SwatchCollection.colorRegex ) || [] );
	}

	// INSTANCE METHODS
	constructor( input ) {
		this.colors = SwatchCollection.extractColors( input ).map( ( color ) => { return new Color( color ); } );

		return this;
	}

	/// TODO[@jrmykolyn]: Make a getter.
	transparent() {
		return this.colors.filter( color => color.isTransparent() );
	}

	/// TODO[@jrmykolyn]: Make a getter.
	opaque() {
		return this.colors.filter( color => !color.isTransparent() );
	}
}
