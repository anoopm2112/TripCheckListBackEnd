const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    content: String,
    userId: String,
    splitId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);