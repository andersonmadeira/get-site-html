// libs used
var Zombie = require("zombie");
var assert = require("assert");
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

// server port and host configs
var server_port = 7777;
var server_ip_address = '127.0.0.1'

var app = express();
var httpServer = http.Server(app);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

// o navegador
var browser = null,
    result = "";

app.get('/', function (request, response) {
  console.log('GET request received.');
  // if we got the url and selector, we need to open a new tab
  if (request.query.url && request.query.selector) {
    // opens the new tab and visits it
    console.log('Opening new tab: ' + request.query.url);
    browser.open(request.query.url);
    browser.visit(request.query.url, function () {
      // gets the element by the specified selector
      result = browser.html(request.query.selector);
      console.log('Loaded tab content. Sending back to user...');
      response.send(result);
    });
    console.log('Tab open: '+browser.tabs.index);
  // if we got the tab id and the selector
  } else if (request.query.tabid && request.query.selector) {
    // store tab Id
    var tabid = request.query.tabid;
    // if we have that tab in our browser
    if (tabid < browser.tabs.index) {
      // sets the current tab to be the one we want
      browser.tabs.current = tabid;
      // returns the html by selector
      console.log('Retrieving content of tab '+tabid+", sending back to user...");
      result = browser.html(request.query.selector);
      response.send(result);
    } else {
      console.log('Tab not found!');
      response.send('Tab not found!');
    }
  } else {
    console.log('Supply either [(the tab id) AND (search selector)] or [(the url to visit) AND (search selector)]!');
    response.send('Supply either [(the tab id) AND (search selector)] or [(the url to visit) AND (search selector)]!');
  }
});

httpServer.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ':' + server_port);
  // creates the browser.
  browser = new Zombie();
});

/*
 
 Creating the tabs:

 $ curl "http://127.0.0.1:7777/?url=http://en.wikipedia.org/wiki/Programming_language&selector=h1"
 $ curl "http://127.0.0.1:7777/?url=http://stackoverflow.com/users/3739186/cyberpunk&selector=h1"
 $ curl "http://127.0.0.1:7777/?url=http://www.google.com.br&selector=a"

 Querying tab content:

 $ curl http://127.0.0.1:7777/?tabid=1&selector=a

*/