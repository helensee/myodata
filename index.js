var express = require('express');
var router = express.Router();
var fs = require('fs');
var $ = jQuery = require('jQuery');

var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.render('pages/index');
});
app.listen(8080);


//CODE TO READ CSV FILE
console.log("CSV starts here!");
var people = [];
var fileContents = fs.readFileSync('test.csv');
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
    people.push(lines[i].toString().split(','));
}

for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < 3; j++) {
        console.log(people[i][j]);
    }
    console.log('\n');
}
