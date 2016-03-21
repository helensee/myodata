console.log("CSV starts here!");
var fs = require('fs');
var $ = jQuery = require('jQuery');
require('../node_modules/jquery/jquery.csv.js');
var sample = '../test.csv';
console.log("About to loop!");
fs.readFile(sample, 'UTF-8', function(err, csv) {
  $.csv.toArrays(csv, {}, function(err, data) {
    for(var i=0, len=data.length; i<len; i++) {
      console.log(data[i]);
    }
  });
});
