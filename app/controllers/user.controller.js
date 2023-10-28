const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create and Save a new User
exports.create = async (req, res) => {
    const dbUser = await User.findOne({ email: req.body.email });

    if (dbUser) {
        const token = jwt.sign({ _id: dbUser._id, email: dbUser.email }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(dbUser);
        // res.send(dbUser);
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.email, salt);
        // Create a New User
        const user = new User({
            id: Math.random().toString(26).slice(2),
            name: req.body.name,
            email: req.body.email || "email@gmail.com",
            token: hashPassword
        });

        // Save User in the database
        user.save().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
    }
};