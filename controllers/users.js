// Require resource's model(s).
var User = require("../models/user");

var edit = function(req, res, next){
  res.render('users/edit', {user: req.user, page: 'edit', apikey: process.env.GOOGLE_KEY});
};

var trips = function(req, res, next) {
  res.render('users/trips', {user: req.user, apikey: process.env.GOOGLE_KEY});
};

function update(req, res, next) {
  req.user.bio = req.body.bio;
  req.user.save(function(err, user){
    res.redirect('/trips/albumSelect');
  });
};



module.exports = {
  edit: edit,
  trips: trips,
  update: update
};

