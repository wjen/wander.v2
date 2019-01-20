// var express = require('express');
var User = require('../models/user');

function index(req, res, next) {
  User.find({}, function(err, users) {
    if(err) res.json({message: 'Could not find users because ' + err});
    res.json(users);
  });
}

function show(req, res, next) {
  var handle = req.params.handle;
  User.find({ handle: handle }, function(err, user) {
    if(err) res.json({message: 'Could not find user because ' + err});
    res.json(user);
  });
}

function destroy(req, res, next) {
  var handle = req.params.handle;
  User.remove({ handle: handle }, function(err, user) {
    if(err) res.json({message: 'Error: ' + err });
    res.json({message: 'Forget that user'});

  });
}

module.exports = {
  index: index,
  show: show,
  destroy: destroy
};
