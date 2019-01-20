var Trip = require("../models/trip");
var User = require("../models/user");
var request = require('request');
var baseSetUrl = 'https://api.flickr.com/services/rest/?method=flickr';

var albumSelect = function(req, res, next) {
  var commonArgsUrl = `&format=json&nojsoncallback=?&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${req.user.flickrId}`;
  var albums = [];

  request(baseSetUrl + '.photosets.getList' + commonArgsUrl + `&primary_photo_extras=url_s`, function(error, response, body) {
    var parsed = JSON.parse(body);
    console.log(parsed.photosets.photoset);

    for(var i=0; i < parsed.photosets.photoset.length; i++) {
    albums.push(parsed.photosets.photoset[i]);
    }
    res.render('trips/albumSelect', {user: req.user, albums: albums, page: 'new', apikey: process.env.GOOGLE_KEY});
  });
};

var newTrip = function(req, res, next) {
  var albumId = req.query.album_id;
  var primaryPhoto = req.query.url;
  res.render('trips/new', {user: req.user, albumId: albumId, primaryPhoto: primaryPhoto, page: 'new', apikey: process.env.GOOGLE_KEY});
};

var create = function(req, res, next) {
  var commonArgsUrl = `&format=json&nojsoncallback=?&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${req.user.flickrId}`;
  var title = req.body.title;
  var descrip = req.body.description;
  var albumId = req.body.albumId;
  var primaryPhoto = req.body.primaryPhoto;
  var photoIds = [];
  var geoTags = [];

  // REQUEST to get photo Ids and GEOTAGS from selected album
  request(baseSetUrl + '.photosets.getPhotos' + commonArgsUrl + `&photoset_id=${albumId}&extras=geo`, function(error, response, body) {
    var newTrip = new Trip({
      title: title,
      description: descrip,
      albumId: albumId,
      primaryPhoto: primaryPhoto,
      createdOn: Date.now(),
      creator: req.user.id,
      // mainPhoto: // photo,
    });

    var parsed = JSON.parse(body);

      parsed.photoset.photo.forEach(function(photo) {
        photoIds.push(photo.id);
        newTrip.locData.push({
          latitude: parseFloat(photo.latitude),
          longitude: parseFloat(photo.longitude)
        });
      });
    newTrip.save(function(err, trip) {
      if(err) {
        console.log(err);
      }
      console.log(newTrip);
      res.redirect('/');
    });
  });
};

var index = function(req, res, next) {
  var userId = req.user._id;
  var tripData = [];

  Trip.find({ creator: userId }, function(err, trips) {
    trips.forEach(function(trip) {
      tripData.push([trip.title, trip.primaryPhoto, trip.id]);
    });
    res.render('trips/index', {user: req.user, tripData: tripData, page: 'index', apikey: process.env.GOOGLE_KEY});
  });
};

var show = function(req, res, next) {
  var tripId = req.params.id;
  var tripData;
  var ownerData;
  var photoUrls = [];
  var commonArgsUrl;

  Trip.findById(tripId, function(err, trip) {
    tripData = {
      tripId: tripId,
      tripAlbumId: trip.albumId,
      tripCreator: trip.creator,
      tripTitle: trip.title,
      tripGeoTags: trip.locData,
      tripDescrip: trip.description
    };
    User.findById(tripData.tripCreator, function(err, user) {
      ownerData = {
        handle: user.handle,
        flickrId: user.flickrId
      };
      commonArgsUrl = `&format=json&nojsoncallback=?&api_key=${process.env.FLICKR_CONSUMER_KEY}&user_id=${ownerData.flickrId}`;

      request(baseSetUrl + '.photosets.getPhotos' + commonArgsUrl + `&photoset_id=${tripData.tripAlbumId}&extras=url_t`, function(error, response, body) {
        var parsed = JSON.parse(body);
        console.log("RETURNED DATA: " + parsed.photoset.photo);
        var photos = parsed.photoset.photo;
        photos.forEach(function(photo) {
          photoUrls.push(photo.url_t);
        });

        res.render('trips/show', {user: req.user, tripData: tripData, photoUrls: photoUrls, page: 'show', apikey: process.env.GOOGLE_KEY});
      });
    });
  });
};

var destroy = function() {

};

module.exports = {
  albumSelect: albumSelect,
  new: newTrip,
  create: create,
  index: index,
  show: show
};

