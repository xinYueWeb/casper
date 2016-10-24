var express = require('express');
var router = express.Router();

var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');



/* GET users listing. */
router.get('/', function(req, res, next) {

  http.get('http://www.ss.pku.edu.cn/index.php/newscenter/news/2391', function (xres) {
    var html = '';        //用来存储请求网页的整个html内容
    var titles = [];
    xres.setEncoding('utf-8'); //防止中文乱码
    //监听data事件，每次取一块数据
    xres.on('data', function (chunk) {
      html += chunk;
    });

    //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
    xres.on('end', function () {
      var $ = cheerio.load(html); //采用cheerio模块解析html
      var news_title = $('div.article-title a').text().trim();
      res.send( news_title );
    })

    });

});


module.exports = router;
