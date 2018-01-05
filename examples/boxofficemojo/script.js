'use strict';
var b = require('bomojo');
c.start('headless');
var f = new java.io.FileWriter('movies.json');
f.write(b.apply(b, Java.from(argv).slice(1)));
f.close();
c.quit();
exit();
