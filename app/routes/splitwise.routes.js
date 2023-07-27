module.exports = (app) => {
    const splitwise = require('../controllers/splitwise.controller.js');

    // Splitwise Routes
    app.post('/splitwises', splitwise.create); // Create a new Splitwise
    app.get('/splitwises/:userId', splitwise.findAll); // Retrieve all Splitwise
    app.put('/splitwises/:id', splitwise.update); // Update a Splitwise with Id
    app.delete('/splitwises/:id', splitwise.delete); // Delete a Splitwise with Id
    app.delete('/splitwises', splitwise.deleteAll); // Delete All Splitwise
    app.get('/splitwises/notes/:id', splitwise.findSplitwiseNote); // Retrieve All notes
    app.delete('/splitwises/notes/:id', splitwise.deleteSplitwiseNoteById); // Delete a Splitwise note with Id
}