// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const hexToHsl = require( 'hex-to-hsl' );

// Project

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
export default class Color {
	// CLASS PROPERTIES
	static hexChars: Array<string> = '0123456789abcdef'.split( '' );
	static alphaRegex: any = /rgba\(\s?([0-9]{1,3}[\,\s]{1,3}){3}([0-9\.\s]*)\)/gmi;
	static rgbValRegex: any = /([0-5]{1,3})/gmi;

	// INSTANCE PROPERTIES
	originalValue: string;
	hex: string;
	hsl: Array<any>;
	opacity: number;

	// CLASS METHODS
	static rgbToHex( color ) {
		// Extract RGB values from `color`.
		var vals = color.match( Color.rgbValRegex );

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
						parseInt( n + '', 10 ),
						Math.floor( ( n % 1 ) * 16 ),
					];
				}
			} )
			.map( ( arr ) => {
				return arr.map( ( val, i ) => {
					return Color.hexChars[ val === 16 ? 15 : val ];
				} );
			} )
			.reduce( ( a, b ) => {
				return `${a}${b[ 0 ]}${b[ 1 ]}`;
			}, '#' );

		return hex;
	}

	static getHex( color ) {
		if ( color.substring( 0, 1 ) === '#' ) {
			return color;
		} else {
			return Color.rgbToHex( color );
		}
	}

	static hexToHsl( color: string ): Array<number> {
		return hexToHsl( color )
	}

	static getOpacity( color ) {

		return color.match( Color.alphaRegex ) ? parseFloat( Color.alphaRegex.exec( color ).reverse()[ 0 ] ) : -1;
	}

	// INSTANCE METHODS
	constructor( color ) {
		this.originalValue = color;
		this.hex = Color.getHex( color );
		this.hsl = Color.hexToHsl( this.hex );
		this.opacity = Color.getOpacity( color );

		return this;
	}

	getHsl( options: any = {} ) {
		let h, s, l;

		switch ( options.as ) {
			case 'object':
				[ h, s, l ] = this.hsl;

				return { h, s, l };
			case 'string':
				[ h, s, l ] = this.hsl;

				return `hsl( ${h}, ${s}%, ${l}% )`;
			default:
				return this.hsl;
		}
	}

	isTransparent() {
		return ( this.opacity && this.opacity !== -1 );
	}

	toSwatch() {
		let declarations = this.getSwatchDeclarations();

		return `<div class="swatch" style="${declarations.join( ';' )}"></div>`;
	}

	getSwatchDeclarations() {
		let declarations = this.getOpaqueSwatchDeclarations();

		if ( this.isTransparent() ) {
			declarations = declarations.concat( this.getTransparentSwatchDeclarations() )
		}

		return declarations;
	}

	getOpaqueSwatchDeclarations() {
		let declarations = [];

		declarations.push( `background: ${this.hex}` );

		return declarations;
	}

	getTransparentSwatchDeclarations() {
		let declarations = [];

		declarations.push( `opacity: ${this.opacity}` );

		return declarations;
	}
}
