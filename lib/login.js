var request = require('request');
var cheerio = require('cheerio');
var info = require('./info');
var jar = request.jar();

var result = function () {
  request({
  url: info.url1,
  method: 'GET',
  jar: jar}, callFunc1)}; 

function callFunc1(err, res, body) {
  if (res.statusCode === 200) {
    var $ = cheerio.load(res.body);
    var formData = {
      utf8: true,
      __VIEWSTATE: $('input[name="__VIEWSTATE"]').val(),
      TextBox1: info.num,
      TextBox2: info.psw,
      RadioButtonList1:info.type,
      Button1:info.sub
    };
    request({
      url: info.url1,
      method: 'POST',
      form: formData,
      jar: jar
    }, callFunc2)
  }
} 

function callFunc2 (err, res, body) {
  if (res.statusCode === 200) {
    request({
      url: info.url2 + info.num,
      method: 'GET',
      jar: jar
    }, callFunc3);
  }
}

function callFunc3 (err, res, body) { 
  if (res.statusCode === 200) {
    var $ = cheerio.load(res.body);
    //console.log($('.info').html());
    var tmp = $('.info').html();
    return tmp;
  }
}
//console.log(result());
