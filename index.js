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

<<<<<<< HEAD
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
=======
	db.serialize(function() {		
		/*
		* 
		NOTE: UNCOMMENT ONLY IF YOU WANT TO ADD MORE THINGS TO DB
		AS IN THE TEST.CSV FILE IS NEW
		OR THERE WILL BE REPEATS BC I DIDNT CHECK FOR THAT lol
		----------------------------------
		for (var i = 1; i < lines.length; i++) {
	    	data.push(lines[i].toString().split(','));
		}

		var stmt = db.prepare("INSERT into myodata(Timestamp,x,y,z,w) VALUES (?,?,?,?,?)");
		for (var i = 0; i < lines.length; i++) {
			if(data[i] != null) {
				console.log(data[i]);
				stmt.run(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]);
			}
	        
	        //db.run("INSERT into myodata(Timestamp,x,y,z,w) VALUES (?)", data[i]);
	        //stmt.run(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]);
	        //stmt.run(d0,d1,d2,d3,d4);
		}
		stmt.finalize();
		console.log('end add to db');
		*/


		db.all("SELECT * FROM myodata", function(err, rows) {  
		        rows.forEach(function (row) {  
		            console.log(row.Timestamp);  
		        });
		        response.render('pages/index.ejs', {
					data: rows
				});
		    });   
		db.close();  

		
>>>>>>> 4a55f9490f311fd5aa90230ab6f92a37d04dfb2c
	});
	
	

});

//db.close();

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