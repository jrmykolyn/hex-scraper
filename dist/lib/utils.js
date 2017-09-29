"use strict";
exports.__esModule = true;
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project
var CONFIG = require("./config");
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function getColors(str) {
    if (!str || typeof str !== 'string') {
        return null;
    }
    return (str.match(/(#[a-f0-9]{3,6})|rgba?\(\s?(([0-9\.]+),?\s?){3,4}\s?\)/gmi) || []);
}
exports.getColors = getColors;
function getColorObjects(arr) {
    return arr
        .filter(function (color, index, arr) {
        return arr.indexOf(color) === index;
    })
        .map(function (color) {
        return {
            originalValue: color
        };
    })
        .map(function (colorObj) {
        if (colorObj.originalValue.substring(0, 1) === '#') {
            colorObj.value = colorObj.originalValue;
        }
        else {
            var pattern = /rgba\(\s?([0-9]{1,3}[\,\s]{1,3}){3}([0-9\.\s]*)\)/gmi; /// TEMP
            colorObj.value = rgbToHex(colorObj.originalValue);
            colorObj.opacity = colorObj.originalValue.match(pattern) ? parseFloat(pattern.exec(colorObj.originalValue).reverse()[0]) : -1;
        }
        return colorObj;
    });
}
exports.getColorObjects = getColorObjects;
function getColorObjectMarkup(colorObj, options) {
    options = (options && typeof options === 'object' && !Array.isArray(options)) ? options : {};
    var declarations = getOpaqueSwatchDeclarations(colorObj);
    if (options.isTransparent) {
        declarations = declarations.concat(getTransparentSwatchDeclaratons(colorObj));
    }
    var declarationString = declarations.join(';');
    return "<div class=\"swatch\" style=\"" + declarationString + "\"></div>";
}
exports.getColorObjectMarkup = getColorObjectMarkup;
function getOpaqueSwatchDeclarations(colorObj) {
    var declarations = [];
    declarations.push("background: " + colorObj.value);
    return declarations;
}
exports.getOpaqueSwatchDeclarations = getOpaqueSwatchDeclarations;
function getTransparentSwatchDeclaratons(colorObj) {
    var declarations = [];
    declarations.push("opacity: " + colorObj.opacity);
    return declarations;
}
exports.getTransparentSwatchDeclaratons = getTransparentSwatchDeclaratons;
function rgbToHex(colorStr) {
    // Extract RGB values from `color`.
    var vals = colorStr.match(/([0-5]{1,3})/gmi);
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
            return CONFIG.data.hexChars[val === 16 ? 15 : val];
        });
    })
        .reduce(function (a, b) {
        return "" + a + b[0] + b[1];
    }, '#');
    return hex;
}
exports.rgbToHex = rgbToHex;
