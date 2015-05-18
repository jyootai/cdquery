var express = require('express');
var path = require('path');
var partials = require('express-partials');
var bodyParser = require('body-parser')
var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
//加载解析json的中间件
app.use(bodyParser.json());
//加载解析urlencoded请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(3000, function(){
  console.log('please open http://localhost:3000, app is listening at port 3000');
});

