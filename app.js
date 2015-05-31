var express = require('express'),
    path = require('path'),
    partials = require('express-partials'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({secret: 'cdquery',
                resave: true,
                saveUninitialized: true
                }));
app.use(flash());
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.listen(3000, function(){
  console.log('please open http://localhost:3000, app is listening at port 3000');
});

