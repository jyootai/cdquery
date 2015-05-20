var express = require('express');
var router = express.Router();
var login = require('../lib/login');
var my_data, my_html

module.exports = function(app) {
  app.get('/', function(req, res){
  res.render('login',{layout:false});
  });

  app.post('/login', function(req, res){
    var account = req.body.account;
    var psw = req.body.password;
    login(account, psw,function(data, html){
      my_data = data;
      my_html = html;
      if (data.err === null ) {
        res.render('index', {data: my_data, ht: my_html.info});
      } else {
        res.render('login',{error: my_data.err,layout:false});
      }
    });
  });
  app.get('/info', function(req, res){
    if (my_data.err === null ) {
      res.render('index', {data: my_data, ht: my_html.info});
    } else {
      res.render('login',{error: "操作过时，请重新登录",layout:false});
    }
  });
  app.get('/score', function(req, res){
    if (my_data.err === null ) {
      res.render('index', {data: my_data, ht: my_html.score});
    } else {
      res.render('login',{error: "操作过时，请重新登录",layout:false});
    }
  });
  app.get('/syllabus', function(req, res){
    if (my_data.err === null ) {
      res.render('index', {data: my_data, ht: my_html.syllabus});
    } else {
      res.render('login',{error: "操作过时，请重新登录",layout:false});
    }
  });
};

