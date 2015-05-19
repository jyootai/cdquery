var express = require('express');
var router = express.Router();
var login = require('../lib/login');

module.exports = function(app) {
  app.get('/', function(req, res){
  res.render('login',{layout:false});
  });

  app.post('/login', function(req, res){
    var account = req.body.account;
    var psw = req.body.password;
    login(account, psw,function(data){
      if (data.err === null ) {
        res.render('index', {data: data});
        
      } else {
        res.render('login',{error: data.err,layout:false});
      }
    });
  });
};

