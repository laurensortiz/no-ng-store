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
var DataStore = require('nedb');
var db = {}; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*=====================================
=            NEDB Database            =
=====================================*/

db.stores = new DataStore({
  filename: 'db/stores.json',
  autoload: true
});

db.stores.ensureIndex({
  fieldName: 'name',
  unique: true
});

db.stores.ensureIndex({
  fieldName: 'address',
  unique: true
});

db.products = new DataStore({
  filename: 'db/products.json',
  autoload: true
});



/*==============================
=            ROUTES            =
==============================*/

// Instance of Express router
var router = express.Router();

router.route('/stores')
  // POST - http://localhost:8080/api/stores - Create Store
  .post(function (req, res) {
    var data = {};

    if (!req.body.name) {
      res.json(400, { error: { message: 'A name is required for a new store' } });
      return;
    }

    if (!req.body.address) {
      res.json(400, { error: { message: 'An address is required for a new store' } });
      return;
    }

    data.name = req.body.name;
    data.address = req.body.address;

    db.stores.insert(data, function (err, created) {
      if (err) {
        res.json(500, { error: { message: err } });
        return;
      }

      
    });

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




