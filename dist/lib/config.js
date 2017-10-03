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
exports.defaults = {
    input: rootDir + "/src/data/styles.css",
    template: rootDir + "/src/views/index.html",
    outFile: process.cwd() + "/index.html"
};
