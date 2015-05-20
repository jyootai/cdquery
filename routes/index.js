var express = require('express'),
    router = express.Router(),
    login = require('../lib/login'),
    my_data, my_html;

module.exports = function(app) {
  app.get('/', checkNotLogin);
  app.get('/', function(req, res){
    res.render('login',{error: req.flash('error').toString(),
                        success: req.flash('success').toString(),
                        layout:false});
  });

  app.post('/login', function(req, res){
    var account = req.body.account,
        psw = req.body.password;
    login(account, psw,function(data, html){
      my_data = data;
      my_html = html;
      if (data.err === null ) {
        res.redirect('/index');
      } else {
        req.flash('error',my_data.err); 
        res.redirect('/');
      }
    });
  });
  
  app.get('/logout', function (req, res) {
    my_data = null;
    my_html = null;
    req.flash('success', '退出成功!');
    res.redirect('/');//登出成功后跳转到主页
  });

  app.get('/index', checkLogin);
  app.get('/index', function(req, res){
    if (my_data.err === null ) {
      res.render('index', {data: my_data, 
                           ht: my_html.info,
                           warning: req.flash('warning').toString()});
    } else {
      req.flash('error', '操作过时，请重新登录'); 
      res.redirect('/');
    }
  });

  app.get('/info', checkLogin);
  app.get('/info', function(req, res){
    if (my_data.err === null ) {
      res.render('info', {data: my_data, ht: my_html.info});
    } else {
      req.flash('error', '操作过时，请重新登录'); 
      res.redirect('/');
    }
  });

  app.get('/score', checkLogin);
  app.get('/score', function(req, res){
    if (my_data.err === null ) {
      res.render('info', {data: my_data, ht: my_html.score});
    } else {
      req.flash('error', '操作过时，请重新登录'); 
      res.redirect('/');
    }
  });

  app.get('/syllabus', checkLogin);
  app.get('/syllabus', function(req, res){
    if (my_data.err === null ) {
      res.render('info', {data: my_data, ht: my_html.syllabus});
    } else {
      req.flash('error', '操作过时，请重新登录'); 
      res.redirect('/');
    }
  });

  function checkLogin(req, res, next) {
    if (!my_data || !my_data.name) {
      req.flash('error', '请先登录'); 
      res.redirect('/');
    }
    next();
  }

  function checkNotLogin(req, res, next) {
    if (my_data&&my_data.name) {
      req.flash('warning', '你已经登录！'); 
      res.redirect('/index');
    }
    next();
  }
};

