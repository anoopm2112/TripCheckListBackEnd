module.exports = (app) => {
    const places = require('../controllers/placelist.controller');

    // Places Routes
    app.post('/places', places.create); // Create a new place
    app.get('/places/:district', places.findParticularDistrict); // Retrieve particular places
    app.put('/places/:id', places.update); // Update a Places with Id
    app.delete('/places/:id', places.delete); // Delete a Place with placeId
}