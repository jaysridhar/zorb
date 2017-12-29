if ( argv.length != 3 ) {
  print("usage: gmail.js email password");
  exit();
}

c.start();

c.go('https://gmail.com');
c.wait(function(d) {
  print('wait for gmail.com');
  return d.getTitle().toLowerCase().startsWith("gmail");
}, 20);

c.css("#identifierId")[0].sendKeys(argv[1]);
c.css(".RveJvd")[0].click();
c.wait(function(d) {
  print('wait for password');
  return c.xpath("//div[@id='password']").size() > 0;
}, 20);

c.xpath("//div[@id='password']//input[@type='password']")[0].sendKeys(argv[2]);
c.css(".RveJvd")[0].click();
c.wait(function() {
  print('wait for main screen');
  return ! c.xpath("//div[@class='Cp']").isEmpty();
}, 20);

function check() {
  c.xpath("//div[@class='Cp']//table/tbody/tr").forEach(function(e) {
    print("From: ");
    c.xpath(e, ".//div[@class='yW']/*").forEach(function(ee) {
      print(" " + ee.getAttribute("email") + ", " + ee.getAttribute("name") + ", " + ee.getText());
    });

    print("Sub: " + c.xpath(e, ".//div[@class='y6']")[0].getText());

    var dt = c.xpath(e, "./td[8]/*")[0];
    print("Date: " + dt.getAttribute("title") + ", " + dt.getText());

    print();
  });
}

check();

// c.quit();
// exit();
