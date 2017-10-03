"use strict";
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
exports.__esModule = true;
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
var Color = /** @class */ (function () {
    // INSTANCE METHODS
    function Color(color) {
        this.originalValue = color;
        this.hex = Color.getHex(color);
        this.opacity = Color.getOpacity(color);
        return this;
    }
    // CLASS METHODS
    Color.rgbToHex = function (color) {
        // Extract RGB values from `color`.
        var vals = color.match(Color.rgbValRegex);
        // Convert extracted `vals` to hex code.
        /// TODO[@jrmykolyn]: Make this not gross.
        var hex = vals
            .slice(0, 3)
            .map(function (val) {
            return parseInt(val, 10);
        })
            .map(function (val) {
            var n = (val / 255) * 16;
            if (n % 1 === 0) {
                return [n, n];
            }
            else {
                return [
                    parseInt(n + '', 10),
                    Math.floor((n % 1) * 16),
                ];
            }
        })
            .map(function (arr) {
            return arr.map(function (val, i) {
                return Color.hexChars[val === 16 ? 15 : val];
            });
        })
            .reduce(function (a, b) {
            return "" + a + b[0] + b[1];
        }, '#');
        return hex;
    };
    Color.getHex = function (color) {
        if (color.substring(0, 1) === '#') {
            return color;
        }
        else {
            return Color.rgbToHex(color);
        }
    };
    Color.getOpacity = function (color) {
        return color.match(Color.alphaRegex) ? parseFloat(Color.alphaRegex.exec(color).reverse()[0]) : -1;
    };
    Color.prototype.isTransparent = function () {
        return (this.opacity && this.opacity !== -1);
    };
    Color.prototype.toSwatch = function () {
        var declarations = this.getSwatchDeclarations();
        return "<div class=\"swatch\" style=\"" + declarations.join(';') + "\"></div>";
    };
    Color.prototype.getSwatchDeclarations = function () {
        var declarations = this.getOpaqueSwatchDeclarations();
        if (this.isTransparent()) {
            declarations = declarations.concat(this.getTransparentSwatchDeclaratons());
        }
        return declarations;
    };
    Color.prototype.getOpaqueSwatchDeclarations = function () {
        var declarations = [];
        declarations.push("background: " + this.hex);
        return declarations;
    };
    Color.prototype.getTransparentSwatchDeclaratons = function () {
        var declarations = [];
        declarations.push("opacity: " + this.opacity);
        return declarations;
    };
    // CLASS PROPERTIES
    Color.hexChars = '0123456789abcdef'.split('');
    Color.alphaRegex = /rgba\(\s?([0-9]{1,3}[\,\s]{1,3}){3}([0-9\.\s]*)\)/gmi;
    Color.rgbValRegex = /([0-5]{1,3})/gmi;
    return Color;
}());
exports["default"] = Color;