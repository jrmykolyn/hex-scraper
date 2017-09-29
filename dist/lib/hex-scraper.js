"use strict";
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require("fs");
// Vendor
// Project
var utils = require("./utils");
var CONFIG = require("./config");
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
function hexScraper(args) {
    // Read source stylesheet.
    var inputSrc = (args.data || fs.readFileSync(args.input || CONFIG.defaults.input, 'utf8'));
    // Read source output template.
    var templateSrc = fs.readFileSync(CONFIG.defaults.template, 'utf8');
    // Get all colors from stylesheet.
    var colorsArr = utils.getColors(inputSrc);
    // Convert array of color strings to array of 'colorObjs'.
    var colorObjs = utils.getColorObjects(colorsArr);
    // Assemble output: transparent swatches.
    var transparentSwatches = colorObjs
        .filter(function (colorObj) {
        /// TODO[@jrmykolyn]: Pull 'check' into dedicated method.
        return (colorObj.opacity !== undefined && colorObj.opacity !== -1);
    })
        .map(function (colorObj) {
        return utils.getColorObjectMarkup(colorObj, { isTransparent: true });
    })
        .reduce(function (a, b) {
        return "" + a + b;
    }, '');
    // Assemble output: opaque swatches.
    var opaqueSwatches = colorObjs
        .filter(function (colorObj) {
        /// TODO[@jrmykolyn]: Pull 'check' into dedicated method.
        return (colorObj.opacity === undefined || colorObj.opacity === -1);
    })
        .map(function (colorObj) {
        return utils.getColorObjectMarkup(colorObj, { isTransparent: false });
    })
        .reduce(function (a, b) {
        return "" + a + b;
    }, '');
    // Inject output into template.
    var templateDist = templateSrc;
    templateDist = templateDist.replace(/\{\{\s?TRANSPARENT_SWATCH_MARKUP\s?\}\}/gmi, transparentSwatches);
    templateDist = templateDist.replace(/\{\{\s?OPAQUE_SWATCH_MARKUP\s?\}\}/gmi, opaqueSwatches);
    // Write compiled template to file system.
    fs.writeFileSync(args.outFile || CONFIG.defaults.outFile, templateDist);
}
module.exports = hexScraper;
