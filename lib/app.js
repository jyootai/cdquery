var request = require('request');
var cheerio = require('cheerio');
var jar = request.jar();
var info = {
  num:'',
  psw:'',
  type: '学生',
  sub: '登录'

}

request({
  url: 'http://202.115.80.153/default_ysdx.aspx',
  method: 'GET',
  jar: jar}, callFunc1); 

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
      url: 'http://202.115.80.153/default_ysdx.aspx',
      method: 'POST',
      form: formData,
      jar: jar
    }, callFunc2)
  }
} 

function callFunc2 (err, res, body) {
  if (res.statusCode === 200) {
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
    var $ = cheerio.load(res.body);
    console.log($('.info').html());
  }
}

