var express = require('express');
var router = express.Router();
var login = require('../lib/login');

router.get('/', function(req, res){
  login(function(data){
    res.render('index', {data: data.nav});
  })
});

module.exports = router;
