# Hex Scraper

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Documentation](#documentation)

## About
Hex Scraper compiles an HTML file of swatches corresponding to the colors used within a given stylesheet or CSS string.

## Installation
```
npm install hex-scraper
```

## Setup
`hex-scraper` does not require any additional setup.

## Usage
After installation, import the `hexScraper` function as follows:

```
var hexScraper = require( 'hex-scraper' );
```

To scrape a given stylesheet, invoke the `hexScraper` function as follows:

```
hexScraper( {
    input: 'path/to/stylesheet',
    outFile: 'path/to/output/file.ext',
} );
```

Please note, if the `outFile` key is not present on the `options` object, the output will be written to the current working directory.

## Documentation
The `hexScraper` takes a single argument: the `options` object. See the *keys* section below for a list of valid options.

### Keys
#### `data`: string
String of CSS to 'scrape'. If present, the value of the `data` key will be used instead of the `input`.

### `input`: string
Path to the CSS file to 'scrape'. If the `data` key is present, this value will be ignored.

### `outFile`: string
Full path to desired location of output, including: path; filename; extension. If this key is omitted, the output will be written to the current working directory.
