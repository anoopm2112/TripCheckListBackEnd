const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
    name: String,
    email: String,
    token: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);