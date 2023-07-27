const { Splitwise } = require('../models/splitwise.model.js');

// Create and Save a new Splitwise
exports.create = (req, res) => {
    // Validate request
    if (!req.body.splitTitle) {
        return res.status(400).send({
            message: "Splitwise title can not be empty"
        });
    }

    // Create Splitwise
    const splitwise = new Splitwise({
        id: Math.floor(Date.now() / 1000),
        creationDate: new Date(),
        totalAmount: req.body.totalAmount,
        splitTitle: req.body.splitTitle,
        notes: req.body.notes,
        members: req.body.members,
        splitWiseListItems: req.body.splitWiseListItems,
        userId: req.body.userId
    });

    // Save Checklist in the database
    splitwise.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the trip splitwise."
        });
    });
};

// Retrieve and return all splitwise from the database.
exports.findAll = (req, res) => {
    Splitwise.find({ userId: req.params.userId }).then(splitwise => {
        let response = {
            message: 'Splitwise fetched successfully',
            splitwise: splitwise
        };
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Trip Splitwise."
        });
    });
};

// Update a Splitwise identified by the splitwiseId in the request
exports.update = (req, res) => {
    // Find splitwise and update it with the request body
    Splitwise.findByIdAndUpdate(req.params.id, {
        totalAmount: req.body.totalAmount,
        notes: req.body.notes,
        splitWiseListItems: req.body.splitWiseListItems,
    }, { new: true }).then(splitwise => {
        if (!splitwise) {
            return res.status(404).send({
                message: "Splitwise not found with id " + req.params.id
            });
        }
        res.send(splitwise);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Splitwise not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating splitwise with id " + req.params.id
        });
    });
};

// Delete a trip splitwise with the specified splitwiseId in the request
exports.delete = (req, res) => {
    Splitwise.findByIdAndRemove(req.params.id).then(splitwise => {
        if (!splitwise) {
            return res.status(404).send({
                message: "Splitwise not found with id " + req.params.id
            });
        }
        res.send({ message: "Splitwise deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Splitwise not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete splitwise with id " + req.params.id
        });
    });
};

// Delete all data in Splitwise
exports.deleteAll = (req, res) => {
    Splitwise.deleteMany({}).then(splitwise => {
        if (splitwise.deletedCount === 0) {
            return res.status(404).send({
                message: "No splitwise found to delete."
            });
        }
        res.send({ message: "All splitwises deleted successfully!" });
    }).catch(err => {
        console.error('Error deleting all splitwises:', err);
        res.status(500).send({
            message: "Could not delete all splitwises."
        });
    });
};

// Retrieve particular split note from the database.
exports.findSplitwiseNote = (req, res) => {
    Splitwise.findById(req.params.id).then(splitwise => {
        let response = {
            message: 'Splitwise Notes fetched successfully',
            splitwiseNote: splitwise?.notes
        };
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Splitwise note."
        });
    });
};

// Delete a trip splitwise with the specified splitwiseId in the request
exports.deleteSplitwiseNoteById = (req, res) => {
    Splitwise?.notes.findByIdAndRemove(req.params.id).then(splitwise => {
        if (!splitwise) {
            return res.status(404).send({
                message: "Splitwise Note not found with id " + req.params.id
            });
        }
        res.send({ message: "Splitwise Note deleted successfully!" });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Splitwise Note not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete splitwise Note with id " + req.params.id
        });
    });
};