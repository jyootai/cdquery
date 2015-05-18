var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var eventproxy = require('eventproxy');
var info = require('./info');
var jar = request.jar();
var data = {};

module.exports = function(account,psw,callback) {
  var ep = new eventproxy();
  request({
  url: info.url1,
  method: 'GET',
  jar: jar}, function (err, res, body){
    if (res.statusCode === 200) {
      var $ = cheerio.load(res.body);
      var formData = {
        utf8: true,
        __VIEWSTATE: $('input[name="__VIEWSTATE"]').val(),
        TextBox1: account,
        TextBox2: psw,
        RadioButtonList1:info.type,
        Button1:info.sub
      };
      request({
        url: info.url1,
        method: 'POST',
        form: formData,
        jar: jar
      }, function (err, res, body){
        if (res.statusCode === 200) {
          request({
            url: info.url2 + account,
            method: 'GET',
            encoding: null,
            jar: jar,
            followRedirect: false
          }, function (err, res, body){
            if (res.statusCode === 200) {
              var chunks = [];
              chunks.push(res.body);
              html = iconv.decode(Buffer.concat(chunks), 'gbk');
              var $ = cheerio.load(html,{decodeEntities: false});
              var name = $('#xhxm').html(),
                  nav = [];
              $('.nav li').each(function(i, ele){
                nav[i] = $(this).html();
              });
              data = {
                err: null,
                name: name,
                nav: nav
              };
              ep.emit('event1',data);
            } else {
              data = {
                err: '用户名或密码错误'
              };
              ep.emit('event1', data);
            } 
          })
        } 
      })
    }
  });
  ep.all('event1', function (data) {
    callback(data);
  })
}

