var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
});

var tripSchema = new mongoose.Schema({
  title:     {type: String, required: true},
  creator:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdOn: Date,
  albumId: String,
  primaryPhoto: String,
  description: String,
  locData: [locationSchema]
});

var Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
