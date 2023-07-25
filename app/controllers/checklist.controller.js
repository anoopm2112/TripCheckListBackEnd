const { TripChecklist } = require('../models/checklist.model.js');

// Create and Save a new Checklist
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Checklist title can not be empty"
        });
    }

    // Create Trip Checklist
    const tripChecklist = new TripChecklist({
        id: Math.floor(Date.now() / 1000),
        creationDate: new Date(),
        isCompleted: false,
        title: req.body.title,
        ReminderTime: req.body.ReminderTime,
        checkListItems: req.body.checkListItems,
        userId: req.body.userId
    });

    // Save Checklist in the database
    tripChecklist.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Trip Checklist."
        });
    });
};

// Retrieve and return all checklists from the database.
exports.findAll = (req, res) => {
    TripChecklist.find({ isCompleted: false, userId: req.body.userId }).then(checklist => {
        let response = {
            message: 'TripChecklist fetched successfully',
            checklist: checklist
        };
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Trip Checklist."
        });
    });
};

// Delete a trip checklist with the specified checklistId in the request
exports.delete = (req, res) => {
    TripChecklist.findByIdAndRemove(req.params.id)
        .then(checklist => {
            if (!checklist) {
                return res.status(404).send({
                    message: "Checklist not found with id " + req.params.id
                });
            }
            res.send({ message: "Checklist deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Checklist not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete checklist with id " + req.params.id
            });
        });
};

// Delete all data in trip checklist
exports.deleteAll = (req, res) => {
    TripChecklist.deleteMany({}).then(checklist => {
        if (checklist.deletedCount === 0) {
            return res.status(404).send({
                message: "No checklists found to delete."
            });
        }
        res.send({ message: "All checklists deleted successfully!" });
    }).catch(err => {
        console.error('Error deleting all checklists:', err);
        res.status(500).send({
            message: "Could not delete all checklists."
        });
    });
};

// Update a checklist identified by the checklistId in the request
exports.update = (req, res) => {
    // Validate request
    if (!req.body.title) {
        return res.status(400).send({
            message: "Checklist title can not be empty"
        });
    }

    // Find checklist and update it with the request body
    TripChecklist.findByIdAndUpdate(req.params.id, {
        isCompleted: req.body.isCompleted,
        checkListItems: req.body.checkListItems
    }, { new: true })
        .then(checklist => {
            if (!checklist) {
                return res.status(404).send({
                    message: "Checklist not found with id " + req.params.id
                });
            }
            res.send(checklist);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Checklist not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating checklist with id " + req.params.id
            });
        });
};

// Retrieve and return all checklists history from the database.
exports.findChecklistHistroy = (req, res) => {
    TripChecklist.find({ isCompleted: true }).then(checklist => {
        let response = {
            message: 'TripChecklist fetched successfully',
            checklist: checklist
        };
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Trip Checklist."
        });
    });
};
