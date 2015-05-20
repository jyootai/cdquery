var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var eventproxy = require('eventproxy');
var info = require('./info');
var jar = request.jar();
var data = {},
    html = {};
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
           var Cookie =jar._jar.store.idx['202.115.80.153']['/']['ASP.NET_SessionId'].toString().split(";")[0].split('=')[1];
            if (res.statusCode === 200) {
              var chunks = [];
              chunks.push(res.body);
              var dec = iconv.decode(Buffer.concat(chunks), 'gbk');
              var $ = cheerio.load(dec,{decodeEntities: false});
              var name = $('#xhxm').html(),
                  nav = [];
              $('.nav li a').each(function(i, ele){
                nav[i] = {text:$(this).text(),
                          href: info.url + $(this).attr('href')}
              });
              data = {
                err: null,
                name: name,
                nav: nav,
                cookie: Cookie
              };
              ep.emit('event1',data);
              //syllabus
              request({
                url: data.nav[15].href,
                method: 'GET',
                jar: jar,
                encoding: null
                }, function (err, res, body){
                  var buff = [];
                  buff.push(res.body);
                  html.syllabus = iconv.decode(Buffer.concat(buff), 'gbk');
                  ep.emit('event2_1',html);
                });
              //score
              request({
                url: data.nav[17].href,
                method: 'GET',
                jar: jar,
                encoding: null
                }, function (err, res, body){
                  var buff = [];
                  buff.push(res.body);
                  html.score = iconv.decode(Buffer.concat(buff), 'gbk');
                  ep.emit('event2_2',html);
                });
              //info
              request({
                url: data.nav[10].href,
                method: 'GET',
                jar: jar,
                encoding: null
                }, function (err, res, body){
                  var buff = [];
                  buff.push(res.body);
                  html = {
                    info: iconv.decode(Buffer.concat(buff), 'gbk')
                  };
                  ep.emit('event2_3',html);
                });
            } else {
              data = {
                err: '用户名或密码错误'
              };
              html = {
                err: 'Not Found'
              }
              ep.emit('event1', data);
              ep.emit('event2_1',html);
              ep.emit('event2_2',html);
              ep.emit('event2_3',html);
            } 
          })
        } 
      })
    }
  });
  ep.all('event1','event2_1','event2_2','event2_3', function (data, html) {
    callback(data,html);
  })
}

