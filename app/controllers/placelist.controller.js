const TripPlacelist = require('../models/placelist.model');

// Create and Save a new Checklist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "place name can not be empty"
        });
    }

    // Create Trip Checklist
    const tripPlacelist = new TripPlacelist({
        id: Math.floor(Date.now() / 1000),
        name: req.body.name,
        note: req.body.note,
        district: req.body.district,
        location: req.body.location,
        createdBy: req.body.createdBy,
        name_TA: req.body.name_TA,
        name_ML: req.body.name_ML,
        name_HI: req.body.name_HI,
        note_TA: req.body.note_TA,
        note_ML: req.body.note_ML,
        note_HI: req.body.note_HI
    });

    // Save Checklist in the database
    tripPlacelist.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Trip place."
        });
    });
};

// Retrieve particular place from the database.
exports.findParticularDistrict = (req, res) => {
    TripPlacelist.find({ district: req.params.district }).then(places => {
        res.send(places);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving places."
        });
    });
};

// Update a place identified by the placeId in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "place name can not be empty"
        });
    }

    // Find place and update it with the request body
    TripPlacelist.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        note: req.body.note,
        location: req.body.location,
        name_TA: req.body.name_TA,
        name_ML: req.body.name_ML,
        name_HI: req.body.name_HI,
        note_TA: req.body.note_TA,
        note_ML: req.body.note_ML,
        note_HI: req.body.note_HI
    }, { new: true }).then(place => {
        if (!place) {
            return res.status(404).send({
                message: "Place not found with id " + req.params.id
            });
        }
        res.send(place);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating place with id " + req.params.id
        });
    });
};

// Delete a place with the specified placeId in the request
exports.delete = (req, res) => {
    TripPlacelist.findByIdAndRemove(req.params.id).then(place => {
        if (!place) {
            return res.status(404).send({
                message: "Place not found with id " + req.params.id
            });
        }
        res.send({ message: "Place deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Place not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete place with id " + req.params.id
        });
    });
};