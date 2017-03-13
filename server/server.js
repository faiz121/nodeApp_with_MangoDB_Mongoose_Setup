var express = require('express');
var morgan = require('morgan');

var parser = require('body-parser');
var Car = require('./cars');

var app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.get('/index', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/cars', function(req, res, next){
  /*{
   name: 'Honda',
   color: 'white',
   year: 2004
   }*/
  var carToBeCreated = req.body;
  var newcar = new Car(carToBeCreated);
  newcar.save(function(err){
    if (err) {
     return next(new Error(err));
    }
    console.log('record saved successfully', JSON.stringify(carToBeCreated));
    res.status(200).send('record saved successfully');
  })
});

app.delete('/cars/:name', function(req, res, next) {
  Car.findOne({name: req.params.name}).exec(function (err, car) {
    if (err || !car) {
      console.log('error finding record to delete', err);
      return next(new Error(err));
    }
      car.remove(function (err, success, next) {
        if (err) return next(err);
        console.log('deleted successfully', car);
        res.send({});
      });

  });
});

app.get('/allcar', function(req, res){
 Car.find({}, function(err, result){
   if (err) {
     console.log('Error fetching records', err);
   }
   res.status(200).send(result);
 });
});

app.use(function(err, req, res, next){
  console.log('Something failed');
  res.status(500).send({"Error" : err.message})
});

app.listen(3000);

module.exports.app = app;