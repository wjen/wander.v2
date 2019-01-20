var mongoose = require('./database');

var User = require('../models/user');
var Trip = require('../models/trip');

User.remove({}, function(err) {
  if (err) console.log(err);
  Trip.remove({}, function(err) {
    console.log('DATABASE CLEANED! <(\'_\'<)');
    mongoose.connection.close(function(err) {
      if (err) console.log(err);
      process.exit(0);
    });
  });
});
