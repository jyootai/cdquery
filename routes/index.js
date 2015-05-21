var express = require('express'),
    router = express.Router(),
    login = require('../lib/login');

module.exports = function(app) {
  app.get('/', function(req, res){
    if (req.session.data) {
      req.flash('warning', null); 
      req.flash('warning', '你已经登录！'); 
      res.redirect('/index');
    } else {
      res.render('login',{error: req.flash('error').toString(),
                        success: req.flash('success').toString(),
                        layout:false});
    }
  });

  app.post('/login', function(req, res){
    var account = req.body.account,
        psw = req.body.password;
    login(account, psw,function(data, html){
      if (data.err === null ) {
        req.session.data = data;
        req.session.html = html;
        res.redirect('/index');
      } else {
        req.flash('error',data.err); 
        res.redirect('/');
      }
    });
  });
  
  app.get('/logout', function (req, res) {
    req.session.data = null;
    req.session.html = null;
    req.flash('success', '退出成功!');
    res.redirect('/');//登出成功后跳转到主页
  });

  app.get('/index', checkLogin, function(req, res){
    var data = req.session.data,
        html = req.session.html;
    res.render('index', {data: data, 
                         ht: html,
                         warning: req.flash('warning').toString()});
  });

  app.get('/info', checkLogin, function(req, res){
    var data = req.session.data,
        html = req.session.html;
    res.render('info', {data: data, ht: html});
  });

  app.get('/score', checkLogin, function(req, res){
    var data = req.session.data,
        html = req.session.html;
    res.render('score', {data: data, ht: html});
  });

  app.get('/syllabus', checkLogin, function(req, res){
    var data = req.session.data,
        html = req.session.html;
    res.render('syllabus', {data: data, ht: html});
  });

  function checkLogin(req, res, next) {
    if (!req.session.data) {
      req.flash('error', null); 
      req.flash('error', '请先登录'); 
      return res.redirect('/');
    }
    next();
  }
};

