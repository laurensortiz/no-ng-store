/**
 * Server API using Express.js 4.8.7
 */

/*=============================================
=            INITIAL CONFIGURATION            =
=============================================*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*==============================
=            ROUTES            =
==============================*/

// Instance of Express router
var router = express.Router();

router.get('/', function (req, res) {
  res.json({
    message: 'Hey from the API!'
  })
});

/*=======================================
=            REGISTER ROUTES            =
=======================================*/

app.use('/api', router);

/*====================================
=            START SERVER            =
====================================*/

app.listen(port);
console.log('Hey from the console! - App on port: ' + port);




