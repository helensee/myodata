var express = require('express');
var router = express.Router();
var fs = require('fs');
var $ = jQuery = require('jQuery');
var sqlite3 = require("sqlite3").verbose();

var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/'));
/*
app.get('/', function(req, res) {
    res.render('pages/index');
});
*/
app.listen(8080);

//DB STUFF
var file = "Database.db";
var exists = fs.existsSync(file);

var db = new sqlite3.Database(file);

db.serialize(function() {
	console.log("doing db stuff!");
	if(!exists) {
		//db.run("CREATE TABLE Stuff (thing TEXT)");
		db.run("CREATE TABLE timedata")
	}
	/*
	var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");
  
	//Insert random data
	  var rnd;
	  for (var i = 0; i < 10; i++) {
	    rnd = Math.floor(Math.random() * 10000000);
	    stmt.run("Thing #" + rnd);
	  }
	  
	stmt.finalize();
*/
	db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
	    console.log(row.id + ": " + row.thing);
	  });
});

app.get('/', function(request, response) {
	//CODE TO READ CSV FILE
	// we will init db stuff
	console.log("CSV starts here!");
	var data = [];
	var fileContents = fs.readFileSync('test.csv');
	var lines = fileContents.toString().split('\n');

	for (var i = 0; i < lines.length; i++) {
	    data.push(lines[i].toString().split(','));
	}

	for (var i = 0; i < lines.length; i++) {
	    for (var j = 0; j < 5; j++) {
	        //console.log(data[i][j]);
	    }
	    //console.log('\n');
	}
	response.render('pages/landing.ejs', {
		data: data
	});

});

db.close();

/*
//CODE TO READ CSV FILE
console.log("CSV starts here!");
var data = [];
var fileContents = fs.readFileSync('test.csv');
var lines = fileContents.toString().split('\n');

for (var i = 0; i < lines.length; i++) {
    data.push(lines[i].toString().split(','));
}

for (var i = 0; i < lines.length; i++) {
    for (var j = 0; j < 3; j++) {
        //console.log(data[i][j]);
    }
    //console.log('\n');
}
*/

/**
//Perform SELECT Operation
db.all("SELECT * from blah blah blah where this="+that,function(err,rows){
//rows contain values while errors, well you can figure out.
});

//Perform INSERT operation.
db.run("INSERT into table_name(col1,col2,col3) VALUES (val1,val2,val3)");

//Perform DELETE operation
db.run("DELETE * from table_name where condition");

//Perform UPDATE operation
db.run("UPDATE table_name where condition");

*/