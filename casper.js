/**
 * Created by lky on 16-10-21.
 */
var casper = require('casper').create();
var links;

function getLinks() {
// Scrape the links from top-right nav of the website
    var links = document.querySelectorAll('h3.c-title a');
    return Array.prototype.map.call(links, function (e) {
        return   e.getAttribute('href')
    });
}

// Opens casperjs homepage
casper.start('http://news.baidu.com/ns?cl=2&rn=20&tn=news&word=%E6%B5%8B%E8%AF%95');

casper.then(function () {
    links = this.evaluate(getLinks);
});

casper.run(function () {
    for(var i in links) {
        console.log(links[i]);
    }
    casper.done();
});
