get-site-html
===========

#### About

The purpose of this small project is to use zombiejs' tabs feature to store open tabs of sites, then getting part of html by the tab id.

####

##### Dependencies:

*Check package.json*

#### How to use:

##### Installing packages:

```shell
 $ npm install
 $ node server.js
```

##### Creating the tabs:

```shell
 $ curl "http://127.0.0.1:7777/?url=http://en.wikipedia.org/wiki/Programming_language&selector=h1"
 $ curl "http://127.0.0.1:7777/?url=http://stackoverflow.com/users/3739186/cyberpunk&selector=h1"
 $ curl "http://127.0.0.1:7777/?url=http://www.google.com.br&selector=a"
```

##### Querying tab content:

```shell
 $ curl http://127.0.0.1:7777/?tabid=1&selector=a
```
