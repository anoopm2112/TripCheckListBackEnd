const mongoose = require('mongoose');
const Note = require('../models/note.model.js');

const SplitwiseSchema = mongoose.Schema({
    id: Number,
    creationDate: Date,
    splitTitle: String,
    totalAmount: Number,
    notes: Array,
    members: Array,
    splitWiseListItems: Array,
    userId: String
}, {
    timestamps: true
});

const Splitwise = mongoose.model('Splitwise', SplitwiseSchema);

module.exports = { Splitwise };