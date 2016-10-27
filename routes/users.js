var express = require('express');
var router = express.Router();

var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
// var request = require('request');
var request = require('superagent');
var queryString = require('querystring')

/**
 * cookeie  部分
 *
 */


var events = require("events");
var emitter = new events.EventEmitter()


setCookeie ();
emitter.on("setCookeie", getTitles)            //监听setCookeie事件



function setCookeie () {
    var relCookie = ['JSESSIONID=4430519F8DD4914E8E8896F98CB9EF6C','_ga=GA1.2.2068617981.1477456018','sdmenu_my_menu=01010101','PHPSESSID=5n959hn0f4iht5fmg6m5jt86q6','ccu=""','ccp=""','bbuserid=1','bbpassword=615e2cbaa746bd1bdb8e9d3ab47c0bab','_gat_UA-39119649-15=1','_ga=GA1.3.2068617981.1477456018']
    request.post('http://privatelounge.amg-china.com/privatelounge/forums/m/showthread.php?t=1410')  //学校里的一个论坛，这是登录提交地址
        .set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .send("username=admin&password=3cz3tGjO")
        .end(function(err, res){
            if (err) throw err;
            // console.log( Object(res.header))
            var cookie = res.header['set-cookie']             //从response中得到cookie
            // console.log(cookie);
            // console.log(cookie[1]);
            cookie = [ 'JSESSIONID=E5A0236D527BD9EDCCEE9D20D2720854; _ga=GA1.2.2068617981.1477456018',
                'ccu=""; _ga=GA1.2.2068617981.1477456018',
                'ccp=""; sdmenu_my_menu=01010101',
                'bbuserid=1;_gat_UA-39119649-15=1;',
                'bbpassword=615e2cbaa746bd1bdb8e9d3ab47c0bab; _ga=GA1.3.2068617981.1477456018' ];
            emitter.emit("setCookeie", cookie)
        })
}

  function getTitles (cookie) {
      var b = '';
        for(var i=0;i<=cookie.length;i++){
            if(cookie[i]) {
                for (var r = 0; r <= cookie[i].length; r++) {
                    if (cookie[i][r] === ';') {
                        b += cookie[i].slice(0, r) + ';';
                    }
                }
            }

        }
        cookie = b;
         console.log(cookie)
        request.get("http://privatelounge.amg-china.com/privatelounge/forums/m/showthread.php?t=1410")             //随便论坛里的一个地址
      // request.get("http://cart.jd.com/cart.action")             //随便论坛里的一个地址
            .set("Cookie", cookie)                 //在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
            // .set("Cookie", [ 'JSESSIONID=05CB09F0D2BCD7C7326FBFBB77245DC5;   bbuserid=1; bbpassword=615e2cbaa746bd1bdb8e9d3ab47c0bab'])                 //在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
            // .set("Cookie", 'ipLocation=%u5317%u4EAC; areaId=1; unpl=V2_ZzNtbUZXQxIlDRIBKxlbDGIKQQ4SVhQdfQ9DAS8bWQdvVEZVclRCFXIURlVnGloUZwoZXENcRxNFCHZXchBYAWcCGllyBBNNIEwHDCRSBUE3XHxcFVUWF3RaTwEoSVoAYwtBDkZUFBYhW0IAKElVVTUFR21yVEMldQl2VH8ZWAViAxNeSmdzEkU4dlR5GF8MZzMTbUNnAUEpC05Wfx1bSGcHEllCUkMUdgB2VUsa; __jdv=122270672|baidu-pinzhuan|t_288551095_baidupinzhuan|cpc|0f3d30c8dba7459bb52f2eb5eba8ac7d_0_5116a4eda16848bba0f9964de3439fe9|1477562526602; _jrda=1; _jrdb=1477562726610; 3AB9D23F7A4B3C9B=4VA45AK5V2MEOQZWWNTJVFJ3H72RDZ5T35CN3DBSR7NR4X6L43IQ6OLQKNDRPJLUMWVADKQQBFDSYHIWXU4TTSXOOI; TrackID=18xj8NAJo5mmtm--ED_sLolkYjPzIxOOJTJ2mZt8WVN2CiAljHVD4dXVF-zGMyiMtaim-ccovBUv-dleHoQubqOSwvz5cikFcUPKExibUawM; pinId=IJ9NW2QQ004LmJu4WZwXtg; pin=xuexing68; unick=%E4%BF%A1%E6%98%9F%E5%93%A5%E5%BE%97%E6%B0%B8%E7%94%9F; thor=58AFAF033924E72893DD944CA9DB92F4C872CDF84FFA0680AD22D41961DF4AFB2B2A4B858E12848BFE5E1AC2D561C38EFE9FF602E856295D73219E44AF4B018CF950327EC1A1A00F3766120005B7DEBB2B343A7C68D56674DB38E94501C049E686B1F6E6C73BC7120AB5F7C430887C3E9F03E42D1E9E309A7F53D11C2FD73AA78BD04A5500719B294AC95BE2DED61B8D; _tp=4rL224AvcRNsgMha1h15Ng%3D%3D; _pst=xuexing68; ceshi3.com=eDx7FWMHHCWjzzTiT33GKEdFFJKv4Cab_CuraRtp1f8; user-key=291ec8bc-be07-4635-874d-7176b78bbac6; cd=0; __jda=122270672.1515141029.1477289415396.1477301816.1477562458.2; __jdb=122270672.15.1515141029|2.1477562458; __jdc=122270672; __jdu=1515141029; ipLoc-djd=1-72-2799-0; cart-main=xx; cn=16')                 //在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
            // .set('Accept', 'application/x-www-form-urlencoded')
            // .set("Content-Type",'application/x-www-form-urlencoded')
            .end(function(err, res){
                if (err){
                    throw err;
                };
                //do something
                console.log(res.text)
                // console.log(cookie[0],cookie[3],cookie[4])
            })
    };

// JSESSIONID=05CB09F0D2BCD7C7326FBFBB77245DC5; _ga=GA1.2.2068617981.1477456018;sdmenu_my_menu=01010101; PHPSESSID=5n959hn0f4iht5fmg6m5jt86q6;_gat_UA-39119649-15=1; _ga=GA1.3.2068617981.1477456018;
// ccu="";
// ccp="";
// bbuserid=1;
// bbpassword=615e2cbaa746bd1bdb8e9d3ab47c0bab
//     [ 'JSESSIONID=E5A0236D527BD9EDCCEE9D20D2720854; PHPSESSID=5n959hn0f4iht5fmg6m5jt86q6',
//     'ccu=""; Path=/',
//     'ccp=""; Path=/',
//     'bbuserid=1; Path=/',
//     'bbpassword=615e2cbaa746bd1bdb8e9d3ab47c0bab; Path=/' ]


/*
function getTitles (cookie) {
    superagent.get("http://privatelounge.amg-china.com/m/detail.html?cid=782&pt=10")             //随便论坛里的一个地址
        .set("Cookie", cookie)                 //在resquest中设置得到的cookie，只设置第四个足以（具体情况具体分析）
        .end(function(err, res){
            if (err){
                throw err;
            };
            //do something
        })

    console.log(cookie)
};
*/





/****/



// 使用superagent
// request
//     .post('/api/pet')
//     .send({ name: 'Manny', species: 'cat' })
//     .set('X-API-Key', 'foobar')
//     .set('Accept', 'application/json')
//     .end(function(err, res){
//         if (res.ok) {alert('yay got ' + JSON.stringify(res.body));
//         } else {alert('Oh no! error ' + res.text);
//         }
//     });
// 使用http
// var postData = queryString.stringify({name: 'Manny', species: 'cat'});
// var options = {
//     path: '/api/pet',
//     method: 'POST',
//     headers: {
//         'X-API-Key': 'foobar',
//         'Accept': 'application/json'
//     }
// };
// var req = http.request(options, function (res) {
//     res.on('data', function (chunk) {
//         console.log(chunk);
//     });
// });
// req.on('error', function (err) {
//     console.log(err);
// });
// req.write(postData);
// req.end();









/*登录成功版本*/

// request
//     .post('http://privatelounge.amg-china.com/privatelounge/registration/login.html')
//     // .send({username:'admin',password:'3cz3tGjO'})
//     .send("username=admin&password=3cz3tGjO")
//     .set('X-API-Key', 'foobar')
//     .set('Accept', 'application/json')
//     .end(function(err, res){
//         if (res.ok) {
//             console.log('you got ' + JSON.stringify(res.body));
//             console.log('you got ' + JSON.stringify(res.text));
//         } else {console.log('Oh no! error ' + res.text);
//         }
//     });

/*登录成功 结尾*/
































/* GET users listing. */
// router.get('/', function(req, res, next) {
//
//   http.get('http://www.ss.pku.edu.cn/index.php/newscenter/news/2391', function (xres) {
//     var html = '';        //用来存储请求网页的整个html内容
//     var titles = [];
//     xres.setEncoding('utf-8'); //防止中文乱码
//     //监听data事件，每次取一块数据
//     xres.on('data', function (chunk) {
//       html += chunk;
//     });
//
//     //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
//     xres.on('end', function () {
//       var $ = cheerio.load(html); //采用cheerio模块解析html
//       var news_title = $('div.article-title a').text().trim();
//       res.send( news_title );
//     })
//
//     });
//
// });

//
//
// router.post('/', function(req, res, next) {
//
//
//     // http.get('http://www.ss.pku.edu.cn/index.php/newscenter/news/2391', function (xres) {
//     //登录
//     // http.post('http://privatelounge.amg-china.com/privatelounge/registration/login.html',{username:'admin',password:'3cz3tGjO'},function (xres) {})
//     http.get(req.body.url, function (xres) {
//         var html = '';        //用来存储请求网页的整个html内容
//         var titles = [];
//         xres.setEncoding('utf-8'); //防止中文乱码
//         //监听data事件，每次取一块数据
//         xres.on('data', function (chunk) {
//             html += chunk;
//         });
//
//         //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
//         xres.on('end', function () {
//             var $ = cheerio.load(html); //采用cheerio模块解析html
//             var news_title = '';
//             $(req.body.select).each(function(){
//                 news_title += '<p>'+$(this).attr('href') + '</p>' ;
//             });
//             res.send( news_title );
//         })
//
//     });
//
// });




module.exports = router;
