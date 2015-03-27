node-inlettere
=========

Small utility to get spelled string for money amounts to words in Italian, expected to be used on bank cheque.
By personal choice, the passed amount will be refered as cents (eg. no decimal part).

## Installation

`npm install inlettere -g`

## Usage
```js
var myChequeAmount = require('inlettere');
console.log(myChequeAmount('2856845')); // will return 'ventottomilacinquecentosessantotto/45'
```

## Test

Tested via mocha/chai, a little Makefile is supplied for development so if needed just run `npm test`

## License
See [LICENSE](LICENSE)

## Release History

* 0.1.0 Initial release
