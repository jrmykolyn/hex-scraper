"use strict";
exports.__esModule = true;
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
var color_1 = require("./color");
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
var SwatchCollection = /** @class */ (function () {
    // INSTANCE METHODS
    function SwatchCollection(input) {
        this.colors = SwatchCollection.extractColors(input).map(function (color) { return new color_1["default"](color); });
        return this;
    }
    // CLASS METHODS
    SwatchCollection.extractColors = function (input) {
        if (!input || typeof input !== 'string') {
            return null;
        }
        return (input.match(SwatchCollection.colorRegex) || []);
    };
    /// TODO[@jrmykolyn]: Make a getter.
    SwatchCollection.prototype.transparent = function () {
        return this.colors.filter(function (color) { return color.isTransparent(); });
    };
    /// TODO[@jrmykolyn]: Make a getter.
    SwatchCollection.prototype.opaque = function () {
        return this.colors.filter(function (color) { return !color.isTransparent(); });
    };
    // CLASS PROPERTIES
    SwatchCollection.colorRegex = /(#[a-f0-9]{3,6})|rgba?\(\s?(([0-9\.]+),?\s?){3,4}\s?\)/gmi;
    return SwatchCollection;
}());
exports["default"] = SwatchCollection;
