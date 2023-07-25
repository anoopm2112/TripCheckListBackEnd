const mongoose = require('mongoose');

const TripChecklistSchema = mongoose.Schema({
    id: Number,
    creationDate: Date,
    title: String,
    isCompleted: Boolean,
    ReminderTime: Date,
    checkListItems: Array,
    userId: String  
}, {
    timestamps: true
});

const TripChecklist = mongoose.model('TripChecklist', TripChecklistSchema);

module.exports = { TripChecklist };