'use strict';

function (name, year)
{
  var movie = {}
  var url = 'http://www.imdb.com/find?q=' + encodeURIComponent(name) + '&s=tt';
  c.go(url);
  c.wait(function() {
    return ! c.css('table.findList').isEmpty();
  }, 20);

  var alist = c.xpath('//table[@class="findList"]//tr[contains(@class,"findResult")]/td[@class="result_text"]/a');
  if ( alist.size() == 0 ) {
    movie.error = "Could not find feature film \"" + name + "\" (" + year + ")";
    return movie;
  } else if ( alist.size() > 1 ) {
    movie.warning = "Multiple entries found for feature film \"" + name + "\" (" + year + ")";
  }

  var ahref = alist[0].getAttribute('href');
  var re = new RegExp("^.*/([^/]+)/[^/]*$");
  var res = re.exec(ahref);
  movie.tt = res[1];
  c.go(ahref);
  c.wait(function() {return !c.xpath('//div[@class="titleBar"]').isEmpty();},20);
  var t = c.xpath('//div[@class="titleBar"]//h1[@itemprop="name"]')[0].text;
  var y = c.xpath('//div[@class="titleBar"]//h1[@itemprop="name"]/span')[0].text;
  movie.title = t.replace(y, '').trim();
  movie.releaseYear = y.replace(/[\(\)]*/g, '');
  movie.certificate = c.xpath('//div[@class="subtext"]')[0].text.split(" | ", 2)[0];
  movie.genres = [];
  c.xpath('//div[@class="subtext"]//span[@itemprop="genre"]')
   .forEach(function(e) { movie.genres.push(e.text); });
  movie.rating = parseFloat(c.xpath('//div[@class="ratingValue"]//span[@itemprop="ratingValue"]')[0].text);
  movie.summary = c.xpath('//div[@class="summary_text"]')[0].text;
  return movie;
}
