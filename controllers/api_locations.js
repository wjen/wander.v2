var Trip = require('../models/trip');

function index(req, res, next) {
  var tripId = req.params.id;
  Trip.findById(tripId, function(err, trip) {
    if(err) console.log(err);
    res.json(trip.locData);
  });
}

module.exports = {
  index: index
};
