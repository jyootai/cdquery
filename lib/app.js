var request = require('request');
var cheerio = require('cheerio');
var jar = request.jar();

request({
  url: 'http://202.115.80.153/default_ysdx.aspx',
  method: 'GET',
  jar: jar}, callFunc1); 

function callFunc1(err, res, body) {
  if (res.statusCode === 200) {
    console.log('ok1');
    var $ = cheerio.load(res.body);
    console.log($('input[name="__VIEWSTATE"]').val());
    var form = {
      utf8: true,
      __VIEWSTATE: $('input[name="__VIEWSTATE"]').val(),
      TextBox1: '',
      TextBox2: ''
    };
    request({
      url: 'http://202.115.80.153/default_ysdx.aspx',
      method: 'POST',
      form: form,
      jar: jar
    }, callFunc2)
  }
} 

function callFunc2 (err, res, body) {
  console.log(res.statusCode);
  if (res.statusCode === 200) {
    console.log('ok3');
    request({
      url: 'http://202.115.80.153/xs_main.aspx?xh=201210409318',
      method: 'GET',
      jar: jar
      //followRedirect: false
    }, callFunc3);
  }
}

function callFunc3 (err, res, body) { 
  if (res.statusCode === 200) {
    console.log('ok3');
    var $ = cheerio.load(res.body);
    console.log($('.passw').html());
  }
}
