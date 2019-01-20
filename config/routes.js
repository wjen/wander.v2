var express = require('express'),
    router  = new express.Router(),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    connect = require('connect');
    methodOverride = require('method-override');

// Require controllers.
var pagesController    = require('../controllers/pages');
var usersController    = require('../controllers/users');
var tripsController    = require('../controllers/trips');
var APIUsersController = require('../controllers/api_users');
var APITripsController = require('../controllers/api_trips');
var APILocationsController = require('../controllers/api_locations');


// root path:
router.get('/', pagesController.feed);

// users resource paths:
router.put('/users', authenticate, usersController.update);
router.get('/users/edit', authenticate, usersController.edit);

// trips paths
router.get('/trips/albumselect', authenticate, tripsController.albumSelect);
router.get('/trips/new', authenticate, tripsController.new);
router.get('/trips/:id', tripsController.show);


router.post('/trips', authenticate, tripsController.create);
router.get('/trips', authenticate, tripsController.index);

//// API PATHS
// api users paths:
router.get('/api/users', APIUsersController.index);
router.get('/api/users/:handle', APIUsersController.show);
router.delete('/users/:handle', authenticate, APIUsersController.destroy);

// api trips paths:
router.get('/api/trips', APITripsController.index);
router.get('/api/trips/:id', APITripsController.show);

// api locations path:
router.get('/api/locations/:id', APILocationsController.index);

// Flickr OAuth
router.get('/auth/flickr',
  passport.authenticate('flickr'), function(req, res) {
});

router.get('/auth/callback',
  passport.authenticate('flickr', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

function authenticate(req, res, next) {
  if(req.user) {
    next();
  } else {
    res.redirect('/auth/flickr');
  }
}

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// contact page
router.get('/contact', pagesController.contact);

// about page
router.get('/about', pagesController.about);

module.exports = router;
