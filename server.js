
var express = require("express");
var app = express();
var path = require('path');
//var app = express.Router();
const morgan = require('morgan');
var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/public'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true,limit: '5mb' }))

// parse application/json
app.use(bodyParser.json({limit: '5mb'}));
var mydb;





app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: 'public' });
});


var port = process.env.PORT || 3000
app.listen(port, function() {
    console.log("To view your app, open this link in your browser: http://localhost:" + port);
});


