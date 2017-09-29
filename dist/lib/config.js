"use strict";
exports.__esModule = true;
// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
var pkgDir = require("pkg-dir");
// Project
// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var rootDir = pkgDir.sync(__dirname);
// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
exports.data = {
    hexChars: '0123456789abcdef'.split('')
};
exports.defaults = {
    input: rootDir + "/demo/src/styles.css",
    template: rootDir + "/demo/src/index.html",
    outFile: process.cwd() + "/index.html"
};
