"use strict";
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
var fs = require("fs");
// Vendor
// Project
var CONFIG = require("./config");
var swatch_collection_1 = require("./modules/swatch-collection");
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
    // Parse input into collection of swatches.
    var swatchCollection = new swatch_collection_1["default"](inputSrc);
    // Assemble output: transparent swatches.
    var transparentSwatches = swatchCollection
        .transparent()
        .map(function (color) {
        return color.toSwatch();
    })
        .reduce(function (a, b) {
        return "" + a + b;
    }, '');
    // Assemble output: opaque swatches.
    var opaqueSwatches = swatchCollection
        .opaque()
        .map(function (color) {
        return color.toSwatch();
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
