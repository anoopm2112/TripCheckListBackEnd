module.exports = (app) => {
    const checklists = require('../controllers/checklist.controller.js');

    // Checklists Routes
    app.post('/checklists', checklists.create); // Create a new Note
    app.get('/checklists', checklists.findAll); // Retrieve all checklists
    app.delete('/checklists/:id', checklists.delete); // Delete a Checklist with Id
    app.delete('/checklists', checklists.deleteAll); // Delete All Checklists
    app.put('/checklists/:id', checklists.update); // Update a Checklist with Id
    app.get('/checklistHistory', checklists.findChecklistHistroy); // Retrieve all checklists history
}