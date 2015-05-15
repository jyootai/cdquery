var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var eventproxy = require('eventproxy');
var info = require('./info');
var jar = request.jar();
var data = {};

module.exports = function(callback) {
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
      }, function (err, res, body){
        if (res.statusCode === 200) {
          request({
            url: info.url2 + info.num,
            method: 'GET',
            encoding: null,
            jar: jar
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
                name: name,
                nav: nav
              };
              ep.emit('event1',data);
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

