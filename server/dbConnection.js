var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sampledb');

mongoose.connection.once('open', function () {
  console.log('Yay you are now connected to MongoDB');
}).on('error', function (err) {
  console.log('Error in MongoDB Connection ... ', err);
});