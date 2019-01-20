var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  handle: String,
  flickrId: String,
  flickrPhotoUrl: String,
  bio: String,
  created: { type: Date, default: Date.now }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
