# cdquery

Cdquery 帮助你查询自己课标表、个人信息以及成绩单。仅限成都大学学生使用。此项目是作为学习Node为目的而开发。

## cdquery 实现原理

简单的说，Cdquery 就是跨站点登录教育系统。后台通过模拟登录教务系统，将相关数据抓取下来经过处理在进行界面显示。因为涉及到个人信息，所以就不截图展示。当前运行在[http://104.143.36.159/](http://104.143.36.159/)。

## 安装部署

*不保证 Windows 系统的兼容性*

```
$ git clone https://github.com/jyootai/cdquery.git

$ cd cdquery

$ npm install 

$ node app.js
```
访问[localhost:3000](localhost:3000)

## 参与

你如果有任何其它的拓展想法或建议都可以提 [issue](https://github.com/jyootai/cdquery/issues),也可以提交PR或者自行 Fork 更改。

## License

MIT

