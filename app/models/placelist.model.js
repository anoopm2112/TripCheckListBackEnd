const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    id: String,
    district: String,
    name: String,
    note: String,
    location: Object,
    createdBy: String,
    name_TA: String,
    name_ML: String,
    name_HI: String,
    note_TA: String,
    note_ML: String,
    note_HI: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Place', PlaceSchema);