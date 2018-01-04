'use strict';

var imdb = require('imdb');

// Limit to number of movies, and skip number from beginning.
function(limit, skip) {
  limit = limit === undefined ? 20 : parseInt(limit);
  skip = skip == undefined ? 0 : parseInt(skip);
  c.go('http://www.boxofficemojo.com/alltime/domestic.htm?page=1&p=.htm');
  c.wait(function() {
    return ! c.xpath('//b[contains(.,"Rank")]').isEmpty();
  }, 20);

  var rnk = c.xpath('.//b[contains(.,"Rank")]')[0];
  var tbody = c.xpath(rnk,'ancestor::tbody')[2];
  var x = c.css(tbody, 'tr').stream().skip(1).map(function(tr) {
    return { title: c.css(tr, 'td:nth-child(2)')[0].text };
  });

  var arr = [];
  c.css(tbody,'tr').stream().skip(1 + skip).map(function(tr) {
    var td = c.css(tr, 'td');
    var rank = parseInt(td[0].text);
    var ge = td[3].text; // parseInt(td[3].text.replace(/(\$|,)/g, ''));
    var yr = parseInt(td[4].text.replace(/\^/g, ''));
    return {
      rank: rank,
      title: td[1].text,
      grossEarnings: ge,
      releaseYear: yr
    };
  }).limit(limit).forEach(function(hit) { arr.push(hit); });

  var movies = [];
  arr.forEach(function(hit) {
    print('Doing (' + hit.title + ', ' + hit.releaseYear + ')');
    var m = imdb(hit.title, hit.releaseYear);
    m.rank = hit.rank;
    m.grossEarnings = hit.grossEarnings;
    movies.push(m);
  });
  print('Found ' + movies.length + ' movies');
  return JSON.stringify(movies);
};
