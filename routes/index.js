var express = require('express');
var router = express.Router();
var login = require('../lib/login');

module.exports = function(app) {
  app.get('/', function(req, res){
    login(function(data){
      res.render('login', {data: data.nav});
    })
  });

  app.post('/login', function(req, res){
    var account = req.body.account;
    res.send(account);
  })
};

