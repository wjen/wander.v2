var express = require('express');
var Trip = require('../models/trip');

function index(req, res, next) {
  Trip.find({}, function(err, trips) {
    if(err) res.json({message: 'Could not find trips because ' + err});
    res.json(trips);
  });
}

function show(req, res, next) {
  var id = req.params.id;
  Trip.findById(id, function(err, trip) {
    if(err) res.json({message: 'Could not find trip because ' + err});
    res.json(trip);
  });
}

module.exports = {
  index: index,
  show: show
};
