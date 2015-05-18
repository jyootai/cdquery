var express = require('express');
var router = express.Router();
var login = require('../lib/login');

module.exports = function(app) {
  app.get('/', function(req, res){
  res.render('login');
  });

  app.post('/login', function(req, res){
    var account = req.body.account;
    var psw = req.body.password;
    login(account, psw,function(data){
      console.log(account, psw);
      res.render('index', {data: data.nav});
    });
  });
};

