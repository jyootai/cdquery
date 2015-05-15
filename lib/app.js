var express = require('express');
var login = require('./login');

var app = express();
app.get('/', function (req, res){
  login(function (data){
    res.send(data.nav);
  })
});

app.listen(3000, function(){
  console.log('please open http://localhost:3000, app is listening at port 3000');
});

