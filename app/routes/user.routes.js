module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/register', user.create); // Register a new User
}