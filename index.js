var express = require('express');
var router = express.Router();

var app = express();
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 8080));
app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.render('pages/index');
});
app.listen(8080);
