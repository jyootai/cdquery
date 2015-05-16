var express = require('express');
var path = require('path');
var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(3000, function(){
  console.log('please open http://localhost:3000, app is listening at port 3000');
});

